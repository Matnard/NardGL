import GltfParser from "../../core/gltf-parser";
import fragmentShaderPartial from "./fragment.glsl";
import vertexShaderPartial from "./vertex.glsl";

import { BasicMaterial } from "../../core/Material";
import Primitive from "../../core/Primitive";

export default class PrincipledCube extends Primitive {
  constructor(gl, sceneData) {
    const sceneObject = new GltfParser(sceneData);

    const primitiveData = sceneObject.getPrimitives()[0];
    console.log(primitiveData);

    const material = new BasicMaterial(
      primitiveData.attributes,
      [],
      vertexShaderPartial,
      fragmentShaderPartial
    );

    const conf = {
      count: 6,
      material
      //indices: primitiveData.indices
    };
    super(gl, conf);
  }

  beforeDraw() {
    this.setUniform("u_modelMatrix", this.matrix);
  }
}
