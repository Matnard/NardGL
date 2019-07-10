import "./styles.css";
import WebglRenderer from "./webglRenderer";
import Dots from "./nodes/Dots";
import Grid from "./nodes/Grid";
import m4 from "./core/m4";

class App extends WebglRenderer {
  init() {
    this.projectionMatrix = m4.projection(
      window.innerWidth,
      window.innerHeight,
      window.innerWidth
    );
    this.scene.push(new Dots(this.gl));
    this.scene.push(new Grid(this.gl));
    this.render();
  }

  beforeDraw(dt) {
    this.scene[0].setUniform(
      "u_pointSize",
      (Math.sin(dt / 1000) * 0.5 + 0.5) * 150
    );

    //this.scene[1].rotation.x = Math.PI;
    this.scene[1].translation.z = -2;
    this.scene[1].rotation.x += 0.01;
    this.scene[1].rotation.y += 0.01;
    this.scene[1].rotation.z += 0.01;
    this.scene[1].computeMatrix(this.projectionMatrix);
    this.scene[1].setUniform("u_modelViewMatrix", this.scene[1].matrix);

    this.currentNode.updateUniforms();
  }
}

new App(document.getElementById("c"));
