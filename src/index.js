import "./styles.css";
import WebglRenderer from "./webglRenderer";
import lonerVertexConf from "./nodes/LonerVertex";
import Primitive from "./core/Primitive";

class App extends WebglRenderer {
  init() {
    const lonerVertex = new Primitive(this.gl, lonerVertexConf);
    this.scene.push(lonerVertex);

    this.render();
  }
}

new App(document.getElementById("c"));
