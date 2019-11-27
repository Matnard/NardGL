import * as NARD from "nardgl";
import logo from "./Nardgl-thumb.png";
import atlas from "./atlas_mindcraft.png";
import { CubeFacesSlicer } from "./CubeFacesSlicer";
import { TexturedCube } from "./TexturedCube";
import cubeData from "./mindcraft-cube-data";
import demoPhysics from "./physics";

const nCubes = 100;
const { world, bodies } = demoPhysics(nCubes);

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
    assets: [logo, atlas]
  }).start();

  camera.translation.y = 4;
  grid.rotation.x = -Math.PI / 2;

  const fps = 60;
  const fpsInterval = 1000 / fps;
  let then = Date.now();

  let angle = 0;
  const radius = 19;

  const cubes = [];
  //const scene = [grid];

  setTimeout(() => {
    const slicer = new CubeFacesSlicer(
      data[atlas],
      64,
      64,
      Array.from({ length: nCubes }).map(() => {
        return cubeData[Math.floor(Math.random() * cubeData.length)];
      })
    );

    slicer.cubeFaces.forEach(faces => {
      const cube = new TexturedCube(...faces);
      cube.quaternion = { x: 0, y: 0, z: 0, w: 1 };
      cubes.push(cube);
    });
    onEnterFrame();
  }, 200);

  NARD.Primitive.projectionMatrix = NARD.m4.projection(
    renderer.canvas.clientWidth,
    renderer.canvas.clientHeight,
    renderer.canvas.clientWidth
  );

  function onEnterFrame() {
    requestAnimationFrame(onEnterFrame);
    var fixedTimeStep = 1.0 / 60.0; // seconds
    var maxSubSteps = 3;
    const now = Date.now();
    const elapsed = now - then;

    if (elapsed > fpsInterval) {
      renderer.render([grid, ...cubes], camera);
      then = now - (elapsed % fpsInterval);

      NARD.Primitive.t = elapsed;
      NARD.Primitive.viewMatrix = camera.viewMatrix;

      //console.log(bodies[0].position);

      cubes.forEach((mesh, i) => {
        mesh.translation.x = bodies[i].position.x;
        mesh.translation.y = bodies[i].position.y;
        mesh.translation.z = bodies[i].position.z;

        mesh.quaternion = {
          x: bodies[i].quaternion.x,
          y: bodies[i].quaternion.y,
          z: bodies[i].quaternion.z,
          w: bodies[i].quaternion.w
        };
      });

      camera.translation.z = radius * Math.sin(angle);
      camera.translation.x = radius * Math.cos(angle);

      angle += 0.001;
      world.step(fixedTimeStep, elapsed, maxSubSteps);
    }
  }
})();
