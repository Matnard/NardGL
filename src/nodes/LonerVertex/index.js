import vertexShaderSrc from "./vertex.glsl";
import fragmentShaderSrc from "./fragment.glsl";
//import { getTypedArray } from "../../core/utils";

export default {
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
