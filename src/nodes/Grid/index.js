import { VertexShader, FragmentShader } from "../../core/Shader";
// import fullVertexShaderSrc from "./vertex.glsl";
import partialFragmentShaderSrc from "./fragment-partial.glsl";
import partialVertexShaderSrc from "./vertex-partial.glsl";
// import fullFragmentShaderSrc from "./fragment.glsl";
import Primitive from "../../core/Primitive";

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
];

const uniforms = [
  {
    name: "u_colors",
    type: "3fv",
    value: [0.8, 0.8, 0.8, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    count: 4
  }
];

const vertexShaderSrc = new VertexShader({
  attributes,
  uniforms,
  script: partialVertexShaderSrc
}).decorated;

const fragmentShaderSrc = new FragmentShader({
  uniforms,
  script: partialFragmentShaderSrc
}).decorated;

console.log(fragmentShaderSrc);

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
