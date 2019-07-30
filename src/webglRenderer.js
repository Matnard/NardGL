import { resizeCanvas } from "./core/utils";
import m4 from "./core/m4";
import Camera from "./core/Camera";
import "./signature";

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
    this.camera = new Camera();
    this.projectionMatrix = m4.projection(
      this.gl.canvas.clientWidth,
      this.gl.canvas.clientHeight,
      this.gl.canvas.clientWidth
    );
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

  beforeDraw(dt) {
    this.scene.forEach(s => {
      s.beforeDraw(dt);
    });
  }

  drawFrame(dt) {
    const gl = this.gl;

    this.scene.forEach(primitive => {
      gl.useProgram(primitive.program);

      if (!primitive.hasRenderedOnce) {
        primitive.updateUniforms();
        primitive.hasRenderedOnce = true;
      }

      gl.bindVertexArray(primitive.vao);

      this.beforeDraw(dt);
      primitive.setUniform("u_projectionMatrix", this.projectionMatrix);
      primitive.setUniform("u_viewMatrix", this.camera.viewMatrix);
      primitive.computeMatrix();
      primitive.beforeDraw(dt);

      primitive.updateUniforms();

      const drawConf = {
        primitiveType:
          primitive.draw.primitiveType !== "undefined"
            ? primitive.draw.primitiveType
            : gl.TRIANGLES,
        offset: primitive.draw.offset,
        count: primitive.draw.count
      };

      if (primitive.indices) {
        gl.drawElements(
          gl.TRIANGLES,
          primitive.indices.srcData.length,
          gl.UNSIGNED_SHORT,
          0
        );
      } else {
        gl.drawArrays(drawConf.primitiveType, drawConf.offset, drawConf.count);
      }
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
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // turn on depth testing
      gl.enable(gl.DEPTH_TEST);
      this.drawFrame(this.then);

      this.then = this.now - (this.elapsed % this.fpsInterval);
    }
  }
}

export default WebGLRenderer;
