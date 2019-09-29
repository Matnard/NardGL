import { VertexShader, FragmentShader } from "../Shader";

class Material {
  //stores material properties
  constructor(conf) {
    const defaults = {
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

Material.POINTS = 0;
Material.TRIANGLES = 4;
Material.LINES = 1;

export { Material };
