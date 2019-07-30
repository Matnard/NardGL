import GltfPrimitive from "../../core/Primitive/GltfPrimitive";
import vertexPartial from "./vertex.glsl";
import fragmentPartial from "./fragment.glsl";

export default class Quad extends GltfPrimitive {
  constructor(gl, primitiveData) {
    super(gl, primitiveData, [], vertexPartial, fragmentPartial);
  }

  beforeDraw() {
    this.setUniform("u_modelMatrix", this.matrix);
  }
}
