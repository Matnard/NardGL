import GltfPrimitive from "../../core/Primitive/GltfPrimitive";
import vertexPartial from "./vertex.glsl";
import fragmentPartial from "./fragment.glsl";

export default class PrincipledCube extends GltfPrimitive {
  constructor(gl, primitiveData) {
    primitiveData.attributes = [
      primitiveData.attributes[0],
      primitiveData.attributes[2]
    ];

    super(
      gl,
      primitiveData,
      [
        {
          name: "u_texture",
          src:
            primitiveData.material.pbrMetallicRoughness.baseColorTexture.texture
        }
      ],
      vertexPartial,
      fragmentPartial
    );
  }

  beforeDraw() {
    this.setUniform("u_modelMatrix", this.matrix);
  }
}
