import * as NARD from "../bundles/nardgl/src";
import { Particles } from "./Particles";
import { Quad } from "./Quad";

const urls = [
  "https://crossorigin.me/https://matnard.github.io/NardGL/assets/quad.gltf"
];

class App extends NARD.WebGLRenderer {
  init() {
    this.particles = new Particles(this.gl);
    this.scene.push(this.particles);

    this.grid = new NARD.Grid(this.gl);
    this.scene.push(this.grid);

    this.quad = new Quad(
      this.gl,
      new NARD.GltfParser(App.data[0]).getPrimitives()[0]
    );

    this.camera.translation.z = 4;
    this.camera.translation.y = 0.5;
    this.camera.rotation.x = Math.PI / 2;
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
