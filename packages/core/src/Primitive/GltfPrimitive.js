import { Primitive } from "./index";
import { PbrMetallicRoughnessMaterial } from "../Material/PbrMetallicRoughnessMaterial";

class GltfPrimitive extends Primitive {
  constructor(
    gl,
    primitiveData,
    textureData = [],
    vertexPartial,
    fragmentPartial
  ) {
    const material = new PbrMetallicRoughnessMaterial(
      primitiveData.attributes,
      [],
      textureData,
      vertexPartial,
      fragmentPartial
    );
    const conf = {
      count: primitiveData.attributes[0].count, //POSITION, maybe..
      material,
      indices: primitiveData.indices
    };
    super(gl, conf);
  }
}

export { GltfPrimitive };
