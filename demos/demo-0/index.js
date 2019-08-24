import * as NARD from "nardgl";
import { Particles } from "./Particles";
import { Quad } from "./Quad";
import quadGltfUrl from "./Quad/quad.gltf";
import { TexturedCube } from "./TexturedCube";
import texturedCubeGltfUrl from "./TexturedCube/textured-cube.gltf";

const urls = [quadGltfUrl, texturedCubeGltfUrl];

new NARD.Loader({
  onProgress: function(progress) {
    console.log(`Progress: ${progress}`);
  },
  assets: urls
})
  .start()
  .then(function(data) {
    const camera = new NARD.Camera();
    const scene = [];
    const renderer = new NARD.WebGLRenderer();
    const gl = renderer.gl;

    const particles = new Particles(gl);
    scene.push(particles);

    const grid = new NARD.Grid(gl);
    grid.rotation.x = Math.PI / 2;
    scene.push(grid);

    const cube = new TexturedCube(
      gl,
      new NARD.GltfParser(data[urls[1]]).getPrimitives()[0]
    );

    cube.translation.y = 2;
    //cube.scale.x = cube.scale.y = cube.scale.z = 0.25;

    scene.push(cube);

    const quad = new Quad(
      gl,
      new NARD.GltfParser(data[urls[0]]).getPrimitives()[0]
    );

    scene.push(quad);

    camera.translation.z = 4;
    camera.translation.y = 0.5;
    // camera.rotation.x = Math.PI / 2;

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
  });
