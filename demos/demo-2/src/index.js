import * as NARD from "nardgl";
import { Grid } from "@nardgl/utils";
import logo from "./Nardgl-thumb.png";

const grid = new Grid();
const camera = new NARD.Camera();
const renderer = new NARD.WebGLRenderer();

(async function() {
  const data = await new NARD.Loader({
    onProgress: function(progress) {
      console.log(`Progress: ${progress}`);
    },
    assets: [logo]
  }).start();
  camera.translation.y = 1;
  //camera.translation.z = -3;
  grid.rotation.x = Math.PI / 2;

  const fps = 60;
  const fpsInterval = 1000 / fps;
  let then = Date.now();

  let angle = 0;
  const radius = 3;

  onEnterFrame();

  function onEnterFrame() {
    requestAnimationFrame(onEnterFrame);
    const now = Date.now();
    const elapsed = now - then;

    if (elapsed > fpsInterval) {
      renderer.render([grid], camera);
      then = now - (elapsed % fpsInterval);

      camera.translation.z = radius * Math.sin(angle);
      camera.translation.x = radius * Math.cos(angle);

      angle += 0.005;
    }
  }
})();
