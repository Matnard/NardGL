import vertexShaderSrc from "./vertex.glsl";
import fragmentShaderSrc from "./fragment.glsl";

export default {
  attributes: [
    {
      name: "a_position",
      type: "VEC3",
      componentType: 5126,
      count: 2,
      srcData: [0, 0, 0, 0.5, 0.5, 0]
    }
  ],
  uniforms: [
    {
      name: "u_pointSize",
      type: "1f",
      value: 50
    }
  ],

  vertexShaderSrc,
  fragmentShaderSrc
};
