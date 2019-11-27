import * as NARD from "nardgl";
import vertexPartial from "./vertex.glsl";
import fragmentPartial from "./fragment.glsl";

class PirateGirl extends NARD.GltfPrimitive {
  constructor(primitiveData) {
    primitiveData.attributes = [
      primitiveData.attributes[0],
      primitiveData.attributes[1]
    ];

    //const img = new Image();
    const img =
      primitiveData.material.pbrMetallicRoughness.baseColorTexture.texture;
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
}

export { PirateGirl };
