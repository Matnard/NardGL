import vertexShaderSrc from "./vertex.glsl";
import fragmentShaderSrc from "./fragment.glsl";
import Primitive from "../../core/Primitive";

const conf = {
  attributes: [
    {
      name: "a_position",
      type: "VEC3",
      componentType: 5126,
      count: 8,
      srcData: [
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
      ],
      offset: 0,
      stride: Float32Array.BYTES_PER_ELEMENT * 3 * 8
    },
    {
      name: "a_colors",
      type: "SCALAR",
      componentType: 5123,
      count: 1,
      offset: Float32Array.BYTES_PER_ELEMENT * 3 * 8,
      stride: 0
    }
  ],
  uniforms: [
    {
      name: "u_colors",
      type: "3fv",
      value: [0.8, 0.8, 0.8, 1, 0, 0, 0, 1, 0, 0, 0, 1]
    }
  ],

  vertexShaderSrc,
  fragmentShaderSrc
};

export default class Grid extends Primitive {
  constructor(gl) {
    super(gl, conf);
  }
}
