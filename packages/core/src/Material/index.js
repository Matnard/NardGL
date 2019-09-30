import { VertexShader, FragmentShader } from "../Shader";

class Material {
  static POINTS = 0;
  static LINES = 1;
  static TRIANGLES = 4;
  static TRIANGLE_STRIP = 5;
  static TRIANGLE_FAN = 6;

  //stores material properties
  constructor(conf) {
    const defaults = {
      uniformsData: [],
      primitiveType: 4 //TRIANGLES
    };
    const options = Object.assign({}, defaults, conf);
    this.vertexShaderPartial = options.vertexShader;
    this.fragmentShaderPartial = options.fragmentShader;
    this.primitiveType = options.primitiveType;
    this.uniformsData = options.uniformsData;
  }

  vertexShaderSrc(attributes, uniforms) {
    return new VertexShader({
      attributes,
      uniforms,
      script: this.vertexShaderPartial
    }).decorated;
  }

  fragmentShaderSrc(uniforms) {
    return new FragmentShader({
      uniforms,
      script: this.fragmentShaderPartial
    }).decorated;
  }
}

export { Material };
