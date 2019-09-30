import * as NARD from "nardgl";
import { Particles } from "./Particles";
import { Grid } from "./Grid";
import { Plane } from "./Plane";

const particles = new Particles();

const camera = new NARD.Camera();
const scene = [];
const renderer = new NARD.WebGLRenderer();

const grid = new Grid();
const plane = new Plane();
grid.rotation.x = Math.PI / 2;
//plane.rotation.x = -Math.PI / 2;
scene.push(grid);

scene.push(particles);
scene.push(plane);

camera.translation.z = 4;
camera.translation.y = 0.5;

const fps = 60;
const fpsInterval = 1000 / fps;
let then = Date.now();
onEnterFrame();

function onEnterFrame() {
  requestAnimationFrame(onEnterFrame);
  const now = Date.now();
  const elapsed = now - then;

  if (elapsed > fpsInterval) {
    camera.rotation.y -= 0.005;
    renderer.render(scene, camera);
    then = now - (elapsed % fpsInterval);
  }
}
