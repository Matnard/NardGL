import { resizeCanvas } from "./core/utils";

class WebGLRenderer {
  constructor(canvas = document.createElement("canvas")) {
    const gl = canvas.getContext("webgl2");

    //Create full bleed canvas if no canvas provided
    if (canvas.parentNode !== document.body) {
      gl.canvas.style.width = "100vw";
      gl.canvas.style.height = "100vh";
      document.body.style.overflow = "hidden";
      document.body.style.margin = 0;
      document.body.appendChild(gl.canvas);
    }

    this.gl = gl;
    this.scene = []; //
    this.init();
    this.startAnimating();
  }

  startAnimating(fps = 60) {
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();
    this.startTime = this.then;
    this.render();
  }

  init() {}

  beforeDraw() {}

  drawFrame(dt) {
    const gl = this.gl;

    this.scene.forEach(node => {
      this.currentNode = node;
      gl.useProgram(node.program);

      if (!node.hasRenderedOnce) {
        node.updateUniforms();
        node.hasRenderedOnce = true;
      }

      gl.bindVertexArray(node.vao);

      this.beforeDraw(dt);

      const drawConf = {
        primitiveType:
          node.draw.primitiveType !== "undefined"
            ? node.draw.primitiveType
            : gl.TRIANGLES,
        offset: node.draw.offset,
        count: node.draw.count
      };

      gl.drawArrays(drawConf.primitiveType, drawConf.offset, drawConf.count);
    });
  }

  render() {
    const gl = this.gl;
    requestAnimationFrame(() => this.render());
    this.now = Date.now();
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsInterval) {
      resizeCanvas(gl.canvas);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(1, 1, 1, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      this.drawFrame(this.then);

      this.then = this.now - (this.elapsed % this.fpsInterval);
    }
  }
}

export default WebGLRenderer;
