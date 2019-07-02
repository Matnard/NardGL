import vertexShaderPartial from "./vertex.glsl";
import fragmentShaderPartial from "./fragment.glsl";
import Primitive from "../../core/Primitive";
import Uniform from "../../core/Uniform";
import Attribute from "../../core/Attribute";
import { VertexShader, FragmentShader } from "../../core/Shader";

const attributes = [
  {
    name: "a_position",
    type: "VEC3",
    componentType: 5126,
    count: 2,
    srcData: [0, 0, 0, 0.5, 0.5, 0],
    stride: 0,
    offset: 0
  }
].map(a => new Attribute(a));

const uniforms = [
  {
    name: "u_pointSize",
    type: "1f",
    value: 50,
    count: 1
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

const draw = {
  primitiveType: 0,
  offset: 0,
  count: 2
};

const conf = {
  attributes,
  uniforms,
  draw,
  vertexShaderSrc,
  fragmentShaderSrc
};

export default class Dots extends Primitive {
  constructor(gl) {
    super(gl, conf);
  }
}
