import GltfParser from "../../core/gltf-parser";
import fragmentShaderPartial from "./fragment.glsl";
import vertexShaderPartial from "./vertex.glsl";
import sceneData from "../../../data/quad.json";
import { BasicMaterial } from "../../core/Material";
import Primitive from "../../core/Primitive";

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

export default class Quad extends Primitive {
  constructor(gl) {
    super(gl, conf);
  }

  beforeDraw() {
    this.setUniform("u_modelViewMatrix", this.matrix);
  }
}
