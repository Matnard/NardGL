import * as NARD from "../bundles/nardgl/src";
import { Particles } from "./Particles";
import { Quad } from "./Quad";
import quadGltfUrl from "./Quad/quad.gltf";
import { TexturedCube } from "./TexturedCube";
import texturedCubeGltfUrl from "./TexturedCube/textured-cube.gltf";
const urls = [quadGltfUrl, texturedCubeGltfUrl];

class App extends NARD.WebGLRenderer {
  init() {
    this.particles = new Particles(this.gl);
    this.scene.push(this.particles);

    this.grid = new NARD.Grid(this.gl);
    this.grid.rotation.x = Math.PI / 2;
    this.scene.push(this.grid);

    this.cube = new TexturedCube(
      this.gl,
      new NARD.GltfParser(App.data[urls[1]]).getPrimitives()[0]
    );

    this.cube.translation.y = 0.5;
    this.cube.scale.x = this.cube.scale.y = this.cube.scale.z = 0.3;

    this.scene.push(this.cube);

    this.quad = new Quad(
      this.gl,
      new NARD.GltfParser(App.data[urls[0]]).getPrimitives()[0]
    );

    this.scene.push(this.quad);

    this.camera.translation.z = 4;
    this.camera.translation.y = 0.5;
    // this.camera.rotation.x = Math.PI / 2;
    this.render();
  }

  beforeDraw(dt) {
    this.camera.rotation.y -= 0.005;
  }
}

new NARD.Loader({
  onProgress: function(progress) {
    console.log(`Progress: ${progress}`);
  },
  assets: urls
})
  .start()
  .then(function(data) {
    App.data = data;
    new App();
  });
