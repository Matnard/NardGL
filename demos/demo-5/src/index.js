import * as NARD from "nardgl";
import logoPath from "./Nardgl-thumb.png";
import { Plane } from "./Plane";
import pirateGirlTexture from "./PirateGirl/texture.png";
import pirateGirlModel from "./PirateGirl/pirate-girl.obj";
import { PirateGirl } from "./PirateGirl";

const grid = new NARD.Grid(14 * 10);
grid.scale.x = 20;
grid.scale.y = 1;
grid.scale.z = 20;
const camera = new NARD.Camera();
const renderer = new NARD.WebGLRenderer();

(async function() {
  const data = await new NARD.Loader({
    onProgress: function(progress) {
      console.log(`Progress: ${progress}`);
    },
    assets: [logoPath, pirateGirlTexture, pirateGirlModel]
  }).start();

  const logo = new Plane(data[logoPath]);
  logo.translation.y = 1;
  camera.translation.y = 1;
  grid.rotation.x = Math.PI / 2;

  const pirate = new PirateGirl(
    NARD.parseObj(data[pirateGirlModel], data[pirateGirlTexture])
  );

  pirate.scale.x = 0.5;
  pirate.scale.y = 0.5;
  pirate.scale.z = 0.5;

  const fps = 60;
  const fpsInterval = 1000 / fps;
  let then = Date.now();

  let angle = 0;
  const radius = 3;
  camera.translation.z = radius;

  const scene = [grid];
  setTimeout(() => {
    //scene.push(logo);
    scene.push(pirate);
  }, 100); //image loading issue...

  NARD.Primitive.projectionMatrix = NARD.m4.projection(
    renderer.canvas.clientWidth,
    renderer.canvas.clientHeight,
    renderer.canvas.clientWidth
  );

  NARD.Primitive.reverseLightDirection = [2, 7, 10];
  onEnterFrame();

  function onEnterFrame() {
    requestAnimationFrame(onEnterFrame);
    const now = Date.now();
    const elapsed = now - then;

    if (elapsed > fpsInterval) {
      NARD.Primitive.t = elapsed;
      NARD.Primitive.viewMatrix = camera.viewMatrix;

      renderer.render(scene);
      then = now - (elapsed % fpsInterval);

      camera.translation.z = radius * Math.sin(angle);
      camera.translation.x = radius * Math.cos(angle);
      //logo.rotation.y = angle;
      //pirate.rotation.y = angle;
      //logo.rotation.x = angle;

      angle += 0.005;
    }
  }
})();
