import { resizeCanvas, debounce } from "./utils";
import { m4 } from "./m4";

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

    this.onResize();
    window.addEventListener("resize", debounce(this.onResize, 250));
  }

  get canvas() {
    return this.gl.canvas;
  }

  onResize = () => {
    this.projectionMatrix = m4.projection(
      this.gl.canvas.clientWidth,
      this.gl.canvas.clientHeight,
      this.gl.canvas.clientWidth
    );
    resizeCanvas(this.gl.canvas);
  };

  render(scene, camera) {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(1, 1, 1, 1);
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

      primitive.setUniform("u_projectionMatrix", this.projectionMatrix);
      primitive.setUniform("u_viewMatrix", camera.viewMatrix);
      primitive.computeMatrix();
      primitive.beforeDraw(this.then);

      primitive.updateUniforms();

      const drawConf = {
        primitiveType:
          primitive.draw.primitiveType !== "undefined"
            ? primitive.draw.primitiveType
            : this.gl.TRIANGLES,
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
