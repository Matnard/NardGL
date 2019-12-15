import { resizeCanvas } from "./utils";

class WebGLRenderer {
  clearColor = [0, 0, 0, 1];

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

    this.onResize();
  }

  get canvas() {
    return this.gl.canvas;
  }

  onResize = () => {
    resizeCanvas(this.gl.canvas);
  };

  render(scene) {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(...this.clearColor);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // turn on depth testing
    this.gl.enable(this.gl.DEPTH_TEST);

    scene.forEach(primitive => {
      if (primitive.needsUpdate) {
        primitive.init(this.gl);
      }

      this.gl.useProgram(primitive.program);

      if (!primitive.hasRenderedOnce) {
        primitive.updateUniforms();
        primitive.hasRenderedOnce = true;
      }

      this.gl.bindVertexArray(primitive.vao);

      primitive.computeMatrix();
      primitive.beforeDraw();
      primitive.updateUniforms();

      const drawConf = {
        primitiveType: primitive.draw.primitiveType,
        offset: primitive.draw.offset,
        count: primitive.draw.count
      };

      if (primitive.indices) {
        this.gl.drawElements(
          drawConf.primitiveType,
          primitive.indices.srcData.length,
          this.gl.UNSIGNED_SHORT,
          0
        );
      } else {
        this.gl.drawArrays(
          drawConf.primitiveType,
          drawConf.offset,
          drawConf.count
        );
      }
    });
  }
}

export { WebGLRenderer };
