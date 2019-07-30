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

export default Material;
