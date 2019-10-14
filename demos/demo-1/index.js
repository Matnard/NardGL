import * as NARD from "nardgl";
import { Particles } from "./Particles";
import { Grid } from "./Grid";
import { Plane } from "./Plane";
import { Plane2 } from "./Plane/plane2";
//import { CubeMap } from "./CubeMap";
import { CameraControl } from "@nardgl/camera-control";
import { SkyboxDayCycles } from "./SkyboxDayCycles";

import daybox from "./miramar_large.jpg";
import nightbox from "./grimmnight_large.jpg";
import avatar from "./profile-512-clean.png";
import texture from "./texture.jpg";

const urls = [daybox, nightbox, avatar, texture];

new NARD.Loader({
  onProgress: function(progress) {
    console.log(`Progress: ${progress}`);
  },
  assets: urls
})
  .start()
  .then(function(data) {
    const particles = new Particles();
    const cube = new SkyboxDayCycles(data[daybox], data[nightbox]);

    const camera = new NARD.Camera();
    const scene = [];
    const renderer = new NARD.WebGLRenderer();

    const control = new CameraControl(camera, renderer.canvas);

    const grid = new Grid();
    const plane = new Plane(data[avatar]);

    const plane2 = new Plane2(data[texture]);

    //scene.push(particles);

    grid.rotation.x = Math.PI / 3;
    //scene.push(grid);

    plane.rotation.x = (Math.PI * Math.random()) / 2;
    scene.push(plane);

    scene.push(plane2);

    cube.scale.x = window.innerWidth;
    cube.scale.y = window.innerWidth;
    cube.scale.z = window.innerWidth;
    scene.push(cube);

    camera.translation.z = 7;

    const fps = 60;
    const fpsInterval = 1000 / fps;
    let then = Date.now();

    setTimeout(onEnterFrame, 100);

    function onEnterFrame() {
      requestAnimationFrame(onEnterFrame);
      const now = Date.now();
      const elapsed = now - then;

      if (elapsed > fpsInterval) {
        control.update();
        renderer.render(scene, camera);
        then = now - (elapsed % fpsInterval);
      }
    }
  });
