import { getSize, getTypedArray, getGLSLType } from "./utils";

class Attribute {
  constructor(conf) {
    for (var key in conf) {
      this[key] = conf[key];
    }
  }

  bind(gl, program) {
    this.gl = gl;
    this.program = program;
    return this;
  }

  toGLSL() {
    return `in ${getGLSLType(this.componentType, this.type)} ${this.name};\n`;
  }

  get location() {
    const location = this.gl.getAttribLocation(this.program, this.name);
    if (location === -1) {
      throw new Error(
        `Maybe not used in shader. Haven't fount the location of the variable name "${
          this.name
        }"`
      );
    }
    return location;
  }

  get size() {
    return getSize(this.type);
  }

  get array() {
    return getTypedArray(this.srcData, this.componentType);
  }
}

export { Attribute };
