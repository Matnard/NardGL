import Material from "..";
import Attribute from "../../Attribute";
import Uniform from "../../Uniform";
import TextureUniform from "../../TextureUniform";
import { VertexShader, FragmentShader } from "../../Shader";
import m4 from "../../m4";
import { createProgramFromSource } from "../../utils";

export default class BasicMaterial extends Material {
  constructor(
    attributesData,
    uniformsData,
    texturesData = [],
    vertexShaderPartial,
    fragmentShaderPartial
  ) {
    const extraUniforms = [
      {
        name: "u_modelMatrix",
        type: "Matrix4fv",
        value: m4.identity(),
        count: 1
      },
      {
        name: "u_viewMatrix",
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
    this.uniforms = [
      ...this.uniforms,
      ...texturesData.map(t => new TextureUniform(t))
    ];
    this.vertexShaderSrc = new VertexShader({
      attributes: this.attributes,
      uniforms: this.uniforms,
      script: vertexShaderPartial
    }).decorated;
    this.fragmentShaderSrc = new FragmentShader({
      uniforms: this.uniforms,
      script: fragmentShaderPartial
    }).decorated;

    console.log(this.fragmentShaderSrc);
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
