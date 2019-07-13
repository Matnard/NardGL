import WebglRenderer from "./webglRenderer";
import Dots from "./primitives/Dots";
import Grid from "./primitives/Grid";
import Quad from "./primitives/Quad";

class App extends WebglRenderer {
  init() {
    this.dots = new Dots(this.gl);
    this.scene.push(this.dots);

    this.grid = new Grid(this.gl);
    this.scene.push(this.grid);

    this.quad = new Quad(this.gl);
    this.scene.push(this.quad);
    //
    this.render();
  }

  beforeDraw(dt) {
    this.camera.translation.z = 4;
    this.camera.translation.y = 0.5;
    this.camera.rotation.x = Math.PI / 2;
    this.camera.rotation.y += 0.005;
  }
}

new App(); //document.getElementById("c"));
