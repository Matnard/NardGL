import vertexShaderPartial from "./vertex.glsl";
import fragmentShaderPartial from "./fragment.glsl";
import Primitive from "../../core/Primitive";
import { BasicMaterial } from "../../core/Material";
import m4 from "../../core/m4";

const attributesData = [
  {
    name: "a_position",
    type: "VEC3",
    componentType: 5126,
    count: 3,
    srcData: [0, 0, 0, 0.5, 0.5, 0, -0.5, -0.5, 0],
    stride: 0,
    offset: 0
  }
];

const uniformsData = [
  {
    name: "u_pointSize",
    type: "1f",
    value: 50,
    count: 1
  }
];

const material = new BasicMaterial(
  attributesData,
  uniformsData,
  vertexShaderPartial,
  fragmentShaderPartial
);

const draw = {
  primitiveType: 0,
  offset: 0
};

const conf = {
  material,
  draw,
  count: 3
};

export default class Dots extends Primitive {
  constructor(gl) {
    super(gl, conf);
  }

  beforeDraw() {
    this.setUniform("u_modelViewMatrix", this.matrix);
  }
}
