import { getGLSLType } from "../utils";

class Shader {
  constructor(conf) {
    this.attributes = conf.attributes;
    this.uniforms = conf.uniforms;
    this.script = conf.script;
  }

  get decorated() {
    throw new Error("Use either VertexShader or FragmentShader instances");
  }
}

class VertexShader extends Shader {
  get decorated() {
    return (
      "#version 300 es\n" +
      "precision mediump float;\n" +
      this.attributes.map(a => a.toGLSL()).join("") +
      "\n" +
      this.uniforms.map(u => u.toGLSL()).join("") +
      "\n" +
      `${this.script}`
    );
  }
}

class FragmentShader extends Shader {
  get decorated() {
    return (
      "#version 300 es\n" +
      "precision mediump float;\n" +
      this.uniforms.map(u => u.toGLSL()).join("") +
      "\n" +
      `${this.script}`
    );
  }
}

export default Shader;
export { VertexShader, FragmentShader };
