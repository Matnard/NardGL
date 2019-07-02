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
    const location = this.gl.getAttribLocation(this.program, this.name);
    if (location === -1) {
      throw new Error(
        `Haven't fount the location of the variable name "${this.name}"`
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

export default Attribute;
