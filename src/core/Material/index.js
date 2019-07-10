import { VertexShader, FragmentShader } from "../Shader";
import { createProgramFromSource } from "../utils";
import Uniform from "../Uniform";
import Attribute from "../Attribute";

class Material {
  constructor(attributes, uniforms, vertexShader, fragmentShader) {
    this.attributes = attributes.map(a => new Attribute(a));
    this.uniforms = uniforms.map(u => new Uniform(u));
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
  }
}

class BasicMaterial extends Material {
  constructor(
    attributesData,
    uniformsData,
    vertexShaderPartial,
    fragmentShaderPartial
  ) {
    super(
      attributesData,
      uniformsData,
      vertexShaderPartial,
      fragmentShaderPartial
    );
    this.attributes = attributesData.map(a => new Attribute(a));
    this.uniforms = uniformsData.map(u => new Uniform(u));
    this.vertexShaderSrc = new VertexShader({
      attributes: this.attributes,
      uniforms: this.uniforms,
      script: vertexShaderPartial
    }).decorated;
    this.fragmentShaderSrc = new FragmentShader({
      uniforms: this.uniforms,
      script: fragmentShaderPartial
    }).decorated;
  }

  createProgram(gl) {
    return createProgramFromSource(
      gl,
      this.vertexShaderSrc,
      this.fragmentShaderSrc
    );
  }
}
export default Material;
export { BasicMaterial };
