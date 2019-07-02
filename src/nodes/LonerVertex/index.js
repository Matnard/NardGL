import vertexShaderSrc from "./vertex.glsl";
import fragmentShaderSrc from "./fragment.glsl";
import Primitive from "../../core/Primitive";

const conf = {
  attributes: [
    {
      name: "a_position",
      type: "VEC3",
      componentType: 5126,
      count: 2,
      srcData: [0, 0, 0, 0.5, 0.5, 0],
      stride: 0,
      offset: 0
    }
  ],
  uniforms: [
    {
      name: "u_pointSize",
      type: "1f",
      value: 50
    }
  ],

  draw: {
    primitiveType: 0,
    offset: 0,
    count: 2
  },

  vertexShaderSrc,
  fragmentShaderSrc
};

export default class LonerVertex extends Primitive {
  constructor(gl) {
    super(gl, conf);
  }
}
