import * as NARD from "nardgl";
import { App } from "@nardgl/app";
import { Plane } from "./Plane";
import logoPath from "./Nardgl-thumb.png";
import { PirateGirl } from "./PirateGirl";
import pirateGirlTexture from "./PirateGirl/texture.png";
import pirateGirlModel from "./PirateGirl/pirate-girl.obj";

console.log(`
- set shaders with globals...
`);

let angle = 0;
let radius = 3;
const grid = new NARD.Grid(14 * 10);
grid.scale.x = 20;
grid.scale.y = 1;
grid.scale.z = 20;
const camera = new NARD.Camera();
const renderer = new NARD.WebGLRenderer();
renderer.clearColor = [51 / 255, 51 / 255, 51 / 255, 1];
const scene = [];
let logo, pirate;

let scale = 1;
const maxRadius = 30;
let angleX = 0;
let angleY = 0;
let dragX = 0;
let dragY = 0;

renderer.canvas.onmousedown = function({ pageX, pageY }) {
  let dx;
  let dy;

  function mouseMove({ clientX: moveX, clientY: moveY }) {
    dx = moveX - pageX;
    dy = moveY - pageY;
    const x = dragX + dx;
    const y = dragY + dy;

    angleX = -(x / renderer.canvas.clientWidth) * 2 + 1;
    angleY = -(y / renderer.canvas.clientHeight) * 2 + 1;
    camera.rotation.x = angleY / scale;
    camera.rotation.y = angleX / scale;
  }

  this.onmouseup = function() {
    this.onmouseup = null;
    this.removeEventListener("mousemove", mouseMove);
    dragX += dx;
    dragY += dy;
  };

  this.addEventListener("mousemove", mouseMove, false);
};

function zoom(event) {
  event.preventDefault();
  scale += event.deltaY * -0.001;
  // Restrict scale
  scale = Math.min(Math.max(0.0001, scale), 1);
  radius = maxRadius * (scale - 0.5);
}

renderer.canvas.onwheel = zoom;

new App()
  .start([logoPath, pirateGirlTexture, pirateGirlModel], function(data) {
    logo = new Plane(data[logoPath]);
    logo.translation.y = 4;
    logo.translation.z = 2;
    camera.translation.y = 1;
    grid.rotation.x = Math.PI / 2;

    pirate = new PirateGirl(
      NARD.parseObj(data[pirateGirlModel], data[pirateGirlTexture])
    );

    pirate.scale.x = 0.5;
    pirate.scale.y = 0.5;
    pirate.scale.z = 0.5;

    logo.scale.x = 0.2;
    logo.scale.y = 0.2;
    logo.scale.z = 0.2;

    camera.translation.z = radius;

    scene.push(grid);
    setTimeout(() => {
      scene.push(logo);
      scene.push(pirate);
    }, 100); //image loading issue...

    NARD.Primitive.reverseLightDirection = [1.5, 2.5, 0.5];
  })
  .onResize(function() {
    NARD.Primitive.projectionMatrix = NARD.m4.projection(
      renderer.canvas.clientWidth,
      renderer.canvas.clientHeight,
      renderer.canvas.clientWidth
    );
    renderer.onResize();
  })
  .onEnterFrame(function(t) {
    const camAngle = angleX;
    camera.yLookAt = angleY * 1.5;
    NARD.Primitive.t = t;
    NARD.Primitive.viewMatrix = camera.viewMatrix;

    renderer.render(scene);
    camera.translation.z = radius * Math.sin(camAngle * 5);
    camera.translation.x = radius * Math.cos(camAngle * 5);
    //pirate.rotation.y = angle;
    logo.rotation.y = -angle * 10;
    logo.rotation.x = -angle * 5;

    angle += 0.005;
  });
