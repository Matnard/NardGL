import * as NARD from "nardgl";
import vertexPartial from "./vertex.glsl";
import fragmentPartial from "./fragment.glsl";

class Quad extends NARD.GltfPrimitive {
  constructor(primitiveData) {
    super(primitiveData, [], vertexPartial, fragmentPartial);
  }

  beforeDraw() {
    this.setUniform("u_modelMatrix", this.matrix);
  }
}

export { Quad };
