import "./styles.css";
import WebglRenderer from "./webglRenderer";
import Dots from "./nodes/Dots";
import Grid from "./nodes/Grid";
import Quad from "./nodes/Quad";
import m4 from "./core/m4";

class App extends WebglRenderer {
  init() {
    this.projectionMatrix = m4.projection(
      this.gl.canvas.clientWidth,
      this.gl.canvas.clientHeight,
      this.gl.canvas.clientWidth
    );

    this.dots = new Dots(this.gl);
    this.grid = new Grid(this.gl);
    this.quad = new Quad(this.gl);

    this.scene.push(this.dots);
    this.scene.push(this.grid);
    this.scene.push(this.quad);
    this.render();
  }

  beforeDraw(dt) {
    this.dots.setUniform("u_pointSize", (Math.sin(dt / 1000) * 0.5 + 0.5) * 50);
    this.dots.translation.z = -3;
    this.dots.rotation.x = -Math.PI / 3;
    this.dots.rotation.z += 0.006;
    this.grid.translation.z = -3;
    this.grid.rotation.x = -Math.PI / 3;
    this.grid.rotation.z += 0.006;

    this.quad.translation.z = -3;
    this.quad.rotation.x = -Math.PI / 3;
    this.quad.rotation.z += 0.006;
  }
}

new App(document.getElementById("c"));
