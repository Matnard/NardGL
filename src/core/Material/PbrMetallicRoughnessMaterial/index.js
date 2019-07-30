import BasicMaterial from "../BasicMaterial";

class PbrMetallicRoughnessMaterial extends BasicMaterial {
  constructor(
    attributes,
    uniforms,
    texturesData = [],
    vertexShaderPartial,
    fragmentShaderPartial
  ) {
    super(
      attributes,
      uniforms,
      texturesData,
      vertexShaderPartial,
      fragmentShaderPartial
    );
  }
}

export default PbrMetallicRoughnessMaterial;
