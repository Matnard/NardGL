import { getSize, getTypedArray } from "./utils";

class Attribute {
  constructor(gl, program, conf) {
    this.gl = gl;
    this.program = program;
    for (var key in conf) {
      this[key] = conf[key];
    }
  }

  get location() {
    return this.gl.getAttribLocation(this.program, this.name);
  }

  get size() {
    return getSize(this.type);
  }

  get array() {
    return getTypedArray(this.srcData, this.componentType);
  }
}

export default Attribute;
