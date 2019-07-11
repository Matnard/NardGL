import "./styles.css";
import WebglRenderer from "./webglRenderer";
import Dots from "./nodes/Dots";
import Grid from "./nodes/Grid";
import m4 from "./core/m4";

class App extends WebglRenderer {
  init() {
    this.projectionMatrix = m4.projection(
      this.gl.canvas.clientWidth,
      this.gl.canvas.clientHeight,
      this.gl.canvas.clientWidth
    );

    this.scene.push(new Dots(this.gl));
    this.scene.push(new Grid(this.gl));
    this.render();
  }

  beforeDraw(dt) {
    this.scene[0].setUniform(
      "u_pointSize",
      (Math.sin(dt / 1000) * 0.5 + 0.5) * 50
    );

    this.scene[0].translation.z = -2;
    this.scene[0].rotation.x = -Math.PI / 3;
    this.scene[0].rotation.z += 0.006;

    this.scene[1].translation.z = -2;
    this.scene[1].rotation.x = -Math.PI / 3;
    this.scene[1].rotation.z += 0.006;
  }
}

new App(document.getElementById("c"));
