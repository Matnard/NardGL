import WebglRenderer from "./webglRenderer";
import Dots from "./primitives/Dots";
import Grid from "./primitives/Grid";
import Quad from "./primitives/Quad";
import NardLoader from "nardloader";
import matnardPath from "../data/profile-512.png";

class App extends WebglRenderer {
  init() {
    this.dots = new Dots(this.gl);
    this.scene.push(this.dots);

    this.grid = new Grid(this.gl);
    this.scene.push(this.grid);

    this.quad = new Quad(this.gl);
    this.scene.push(this.quad);
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

new App(); //document.getElementById("c"));

new NardLoader({
  onProgress: function(progress) {
    console.log(`Progress: ${progress}`);
  }
})
  .add(matnardPath)
  .start()
  .then(function(data) {
    console.log(data);
  });
