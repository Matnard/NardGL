import "./styles.css";
import WebglRenderer from "./webglRenderer";
import lonerVertexConf from "./nodes/LonerVertex";
import Primitive from "./core/Primitive";
// import Grid from "./nodes/Grid";

class App extends WebglRenderer {
  init() {
    const lonerVertex = new Primitive(this.gl, lonerVertexConf);

    this.scene.push(lonerVertex);
    //this.scene.push(new Grid(this.gl));

    this.render();
  }

  beforeDraw(dt) {
    this.scene[0].updateUniform(
      "u_pointSize",
      (Math.sin(dt / 1000) * 0.5 + 0.5) * 150
    );
  }
}

new App(document.getElementById("c"));
