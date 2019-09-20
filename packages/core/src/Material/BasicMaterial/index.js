import { Material } from "../index";

class BasicMaterial extends Material {
  constructor(
    attributesData,
    uniformsData,
    texturesData = [],
    vertexShaderPartial,
    fragmentShaderPartial
  ) {
    super({
      uniformsData,
      texturesData,
      vertexShader: vertexShaderPartial,
      fragmentShader: fragmentShaderPartial
    });
    this.attributesData = attributesData;
    this.uniformsData = uniformsData;
    this.texturesData = texturesData;
  }
}

export { BasicMaterial };
