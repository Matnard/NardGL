import "./styles.css";
import WebglRenderer from "./webglRenderer";
import Dots from "./nodes/Dots";
import Grid from "./nodes/Grid";

class App extends WebglRenderer {
  init() {
    this.scene.push(new Dots(this.gl));
    this.scene.push(new Grid(this.gl));

    this.render();
  }

  beforeDraw(dt) {
    this.scene[0].setUniform(
      "u_pointSize",
      (Math.sin(dt / 1000) * 0.5 + 0.5) * 150
    );

    this.currentNode.updateUniforms();
  }
}

new App(document.getElementById("c"));
