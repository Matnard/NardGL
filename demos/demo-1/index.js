import * as NARD from "nardgl";
import { Particles } from "./Particles";
import { Plane } from "./Plane";
import { Plane2 } from "./Plane/plane2";
// import { CubeMap } from "./CubeMap";
// import { CameraControl } from "@nardgl/camera-control";
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
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve(data);
      }, 100);
    });
  })
  .then(function(data) {
    const particles = new Particles();
    const cube = new SkyboxDayCycles(data[daybox], data[nightbox]);

    const camera = new NARD.Camera();
    const scene = [];
    const renderer = new NARD.WebGLRenderer();

    //const control = new CameraControl(camera, renderer.canvas);

    const grid = new NARD.Grid();
    const plane = new Plane(data[avatar]);

    const plane2 = new Plane2(data[texture]);

    scene.push(particles);

    grid.rotation.x = Math.PI / 2;
    scene.push(grid);

    //plane.rotation.x = Math.PI / 2;
    plane.translation.z = -1;

    scene.push(plane);

    plane2.translation.z = 1;
    plane2.rotation.y = Math.PI / 2;
    scene.push(plane2);

    cube.scale.x = 40;
    cube.scale.y = 40;
    cube.scale.z = 40;
    scene.push(cube);

    //camera.translation.z = 4;
    camera.translation.y = -0.5;
    //camera.rotation.y = -Math.PI / 4;

    const fps = 60;
    const fpsInterval = 1000 / fps;
    let then = Date.now();
    let t = 0;

    setTimeout(onEnterFrame, 100);

    NARD.Primitive.projectionMatrix = NARD.m4.projection(
      renderer.canvas.clientWidth,
      renderer.canvas.clientHeight,
      renderer.canvas.clientWidth
    );

    function onEnterFrame() {
      requestAnimationFrame(onEnterFrame);
      const now = Date.now();
      const elapsed = now - then;

      if (elapsed > fpsInterval) {
        //control.update();

        NARD.Primitive.t = elapsed;
        NARD.Primitive.viewMatrix = camera.viewMatrix;

        camera.translation.z += 0.05 * Math.sin(t * 0.01);
        camera.translation.x += 0.05 * Math.sin(t * 0.01 + 1);
        particles.rotation.x += 0.05;
        particles.rotation.y += 0.03;
        particles.rotation.z -= 0.05;
        renderer.render(scene);
        then = now - (elapsed % fpsInterval);
      }
      t++;
    }
  });
