import { GltfPrimitive } from "nardgl";
import vertexPartial from "./vertex.glsl";
import fragmentPartial from "./fragment.glsl";

class TexturedCube extends GltfPrimitive {
  constructor(primitiveData) {
    primitiveData.attributes = [
      primitiveData.attributes[0],
      primitiveData.attributes[2]
    ];

    const img = new Image();
    img.src =
      primitiveData.material.pbrMetallicRoughness.baseColorTexture.texture;

    //img.load = () => {};
    super(
      primitiveData,
      [
        {
          name: "u_texture",
          img,
          data: 0
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

export { TexturedCube };
