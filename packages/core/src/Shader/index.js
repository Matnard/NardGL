import { getMatches } from "../utils";
import shaderBits from "../Shader/shader-bits";

class Shader {
  constructor(conf) {
    this.attributes = conf.attributes;
    this.uniforms = conf.uniforms;
    this.script = conf.script;
  }

  get decorated() {
    throw new Error("Use either VertexShader or FragmentShader instances");
  }

  static resolveIncludes(script) {
    const includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
    getMatches(includePattern, script).forEach(match => {
      script = script.replace(match[0], shaderBits[match[1]]);
    });

    return script;
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
      `${Shader.resolveIncludes(this.script)}`
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
      `${Shader.resolveIncludes(this.script)}`
    );
  }
}

export { Shader, VertexShader, FragmentShader };
