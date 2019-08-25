import * as NARD from "nardgl";

window.NARD = NARD;
const camera = new NARD.Camera();
const scene = [];
const renderer = new NARD.WebGLRenderer();

const grid = new NARD.Grid();
grid.rotation.x = Math.PI / 2;
scene.push(grid);

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
