import WebglRenderer from "./webglRenderer";
import Particles from "./primitives/Particles";
import Grid from "./primitives/Grid";
import Quad from "./primitives/Quad";
import NardLoader from "nardloader";
import assets from "../preload/*.*";
import PrincipledCube from "./primitives/PrincipledCube";

const urls = Object.values(assets)
  .map(Object.values)
  .flat();

class App extends WebglRenderer {
  init() {
    this.particles = new Particles(this.gl);
    this.scene.push(this.particles);

    this.grid = new Grid(this.gl);
    this.scene.push(this.grid);

    this.quad = new Quad(this.gl, App.data[2]);
    this.scene.push(this.quad);

    this.cube = new PrincipledCube(this.gl, App.data[0]);
    //
    this.camera.translation.z = 4;
    this.camera.translation.y = 0.5;
    this.camera.rotation.x = Math.PI / 2;
    this.render();
  }

  beforeDraw(dt) {
    this.quad.rotation.y += 0.005;
    this.camera.rotation.y -= 0.005;
  }
}
//console.log(urls);
new NardLoader({
  onProgress: function(progress) {
    console.log(`Progress: ${progress}`);
  },
  assets: urls
})
  .start()
  .then(function(data) {
    App.data = data;
    new App(); //document.getElementById("c"));
  });
