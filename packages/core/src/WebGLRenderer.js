import { resizeCanvas } from "./utils";
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
    this.projectionMatrix = m4.projection(
      this.gl.canvas.clientWidth,
      this.gl.canvas.clientHeight,
      this.gl.canvas.clientWidth
    );
  }

  render(scene, camera) {
    const gl = this.gl;

    resizeCanvas(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // turn on depth testing
    gl.enable(gl.DEPTH_TEST);

    scene.forEach(primitive => {
      gl.useProgram(primitive.program);

      if (!primitive.hasRenderedOnce) {
        primitive.updateUniforms();
        primitive.hasRenderedOnce = true;
      }

      gl.bindVertexArray(primitive.vao);

      primitive.setUniform("u_projectionMatrix", this.projectionMatrix);
      primitive.setUniform("u_viewMatrix", camera.viewMatrix);
      primitive.computeMatrix();
      primitive.beforeDraw(this.then);

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
}

export { WebGLRenderer };
