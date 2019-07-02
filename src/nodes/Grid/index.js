import { VertexShader, FragmentShader } from "../../core/Shader";
import fragmentShaderPartial from "./fragment.glsl";
import vertexShaderPartial from "./vertex.glsl";
import Primitive from "../../core/Primitive";
import Uniform from "../../core/Uniform";
import Attribute from "../../core/Attribute";

let srcData = [
  0,
  -1,
  0,
  3,

  0,
  1,
  0,
  3,

  0,
  0,
  -1,
  2,

  0,
  0,
  1,
  2,

  -1,
  0,
  0,
  1,

  1,
  0,
  0,
  1
];
let subDiv = 14;
let step = 2 / subDiv;

for (var i = step; i <= 1; i += step) {
  let verticals = [i, 1, 0, 0, i, -1, 0, 0, -i, 1, 0, 0, -i, -1, 0, 0];
  let horizontals = [1, i, 0, 0, -1, i, 0, 0, 1, -i, 0, 0, -1, -i, 0, 0];
  srcData = [...srcData, ...verticals, ...horizontals];
}

const count = srcData.length / 4;

const attributes = [
  {
    name: "a_position",
    type: "VEC3",
    componentType: 5126,
    count,
    srcData,
    stride: Float32Array.BYTES_PER_ELEMENT * 4,
    offset: 0
  },
  {
    name: "a_colors",
    type: "SCALAR",
    componentType: 5126,
    count,
    stride: Float32Array.BYTES_PER_ELEMENT * 4,
    offset: Float32Array.BYTES_PER_ELEMENT * 3
  }
].map(a => new Attribute(a));

const uniforms = [
  {
    name: "u_colors",
    type: "3fv",
    value: [0.8, 0.8, 0.8, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    count: 4
  }
].map(u => new Uniform(u));

const vertexShaderSrc = new VertexShader({
  attributes,
  uniforms,
  script: vertexShaderPartial
}).decorated;

const fragmentShaderSrc = new FragmentShader({
  uniforms,
  script: fragmentShaderPartial
}).decorated;

const conf = {
  attributes,
  uniforms,
  vertexShaderSrc,
  fragmentShaderSrc,
  draw: {
    primitiveType: 1,
    offset: 0,
    count
  }
};

export default class Grid extends Primitive {
  constructor(gl) {
    super(gl, conf);
  }
}
