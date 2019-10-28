import { Primitive } from "./index";
import { PbrMetallicRoughnessMaterial } from "../Material/PbrMetallicRoughnessMaterial";
import { StaticGeometry } from "../Geometry/StaticGeometry";

class GltfPrimitive extends Primitive {
  constructor(
    primitiveData,
    texturesData = [],
    vertexPartial,
    fragmentPartial
  ) {
    const material = new PbrMetallicRoughnessMaterial({
      fragmentShader: fragmentPartial,
      vertexShader: vertexPartial,
      primitiveType: PbrMetallicRoughnessMaterial.TRIANGLES,
      texturesData
    });
    const geometry = new StaticGeometry(
      primitiveData.attributes,
      primitiveData.indices
    );
    super(geometry, material);
  }
}

export { GltfPrimitive };
