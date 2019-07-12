import { VertexShader, FragmentShader } from "../Shader";
import { createProgramFromSource } from "../utils";
import Uniform from "../Uniform";
import Attribute from "../Attribute";
import m4 from "../m4";

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
    const extraUniforms = [
      {
        name: "u_modelViewMatrix",
        type: "Matrix4fv",
        value: m4.identity(),
        count: 1
      },
      {
        name: "u_projectionMatrix",
        type: "Matrix4fv",
        value: m4.identity(),
        count: 1
      }
    ];

    uniformsData = [...uniformsData, ...extraUniforms];

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

  bindUniforms(gl, program) {
    return this.uniforms.concat([]).map(uniform => uniform.bind(gl, program));
  }

  bindAttributes(gl, program) {
    return this.attributes
      .concat([])
      .map(attribute => attribute.bind(gl, program));
  }
}
export default Material;
export { BasicMaterial };
