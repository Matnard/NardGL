import { GltfPrimitive } from "nardgl";
import vertexPartial from "./vertex.glsl";
import fragmentPartial from "./fragment.glsl";

class Quad extends GltfPrimitive {
  constructor(gl, primitiveData) {
    super(gl, primitiveData, [], vertexPartial, fragmentPartial);
  }

  beforeDraw() {
    this.setUniform("u_modelMatrix", this.matrix);
  }
}

export { Quad };
