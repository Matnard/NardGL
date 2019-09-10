import { Attribute } from "../../Attribute";
import { Uniform } from "../../Uniform";
import { TextureUniform } from "../../TextureUniform";
import { VertexShader, FragmentShader } from "../../Shader";
import { m4 } from "../../m4";

class BasicMaterial {
  constructor(
    attributesData,
    uniformsData,
    texturesData = [],
    vertexShaderPartial,
    fragmentShaderPartial
  ) {
    this.attributesData = attributesData;
    this.uniformsData = uniformsData;
    this.texturesData = texturesData;
    this.vertexShaderPartial = vertexShaderPartial;
    this.fragmentShaderPartial = fragmentShaderPartial;
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

export { BasicMaterial };
