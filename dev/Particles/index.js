import vertexShaderPartial from "./vertex.glsl";
import fragmentShaderPartial from "./fragment.glsl";
import { Primitive, BasicMaterial } from "../../bundles/nardgl/src";

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
  [],
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

class Particles extends Primitive {
  constructor(gl) {
    super(gl, conf);
  }

  beforeDraw(dt) {
    this.setUniform("u_modelMatrix", this.matrix);
    this.setUniform("u_pointSize", (Math.sin(dt / 1000) * 0.5 + 0.5) * 41);
  }
}

export { Particles };
