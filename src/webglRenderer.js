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

  drawFrame(dt) {
    const gl = this.gl;
    resizeCanvas(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.scene[0].program);
    gl.bindVertexArray(this.scene[0].vao);
    this.scene[0].updateUniform(
      "u_pointSize",
      (Math.sin(dt / 1000) * 0.5 + 0.5) * 150
    );

    const drawConf = {
      primitiveType: gl.POINTS,
      offset: 0,
      count: 2
    };

    gl.drawArrays(drawConf.primitiveType, drawConf.offset, drawConf.count);
  }

  render() {
    requestAnimationFrame(() => this.render());
    this.now = Date.now();
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsInterval) {
      this.drawFrame(this.then);

      this.then = this.now - (this.elapsed % this.fpsInterval);
    }
  }
}

export default WebGLRenderer;
