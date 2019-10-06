import * as NARD from "nardgl";
import { Particles } from "./Particles";
import { Grid } from "./Grid";
import { Plane } from "./Plane";
import { Plane2 } from "./Plane/plane2";
import { CubeMap } from "./CubeMap";

const particles = new Particles();
const cube = new CubeMap();

const camera = new NARD.Camera();
const scene = [];
const renderer = new NARD.WebGLRenderer();

const grid = new Grid();
grid.rotation.x = Math.PI / 3;
const plane = new Plane();

const plane2 = new Plane2();
// plane.rotation.x = (Math.PI * Math.random()) / 2;

scene.push(grid);
scene.push(particles);
scene.push(plane);
scene.push(plane2);
cube.scale.x = 40;
cube.scale.y = 40;
cube.scale.z = 40;
//cube.rotation.x = Math.PI / 2;
scene.push(cube);

//camera.translation.z = 14;
//camera.translation.y = 0.5;

const fps = 60;
const fpsInterval = 1000 / fps;
let then = Date.now();
onEnterFrame();

function onEnterFrame() {
  requestAnimationFrame(onEnterFrame);
  const now = Date.now();
  const elapsed = now - then;

  if (elapsed > fpsInterval) {
    camera.rotation.x += 0.005;
    camera.rotation.y += 0.005;
    camera.rotation.z += 0.005;
    renderer.render(scene, camera);
    then = now - (elapsed % fpsInterval);
  }
}
