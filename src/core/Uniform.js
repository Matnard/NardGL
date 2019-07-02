class Uniform {
  constructor(gl, program, conf) {
    this.gl = gl;
    this.program = program;
    for (var key in conf) {
      this[key] = conf[key];
    }
  }

  getLocation() {
    return this.gl.getUniformLocation(this.program, this.name);
  }

  update(data) {
    this.passUniforms({
      location: this.getLocation(),
      type: this.type,
      data: [data]
    });
  }

  passUniforms(options) {
    const gl = this.gl;
    const { location, data, type } = options;

    try {
      gl[`uniform${type}`];
    } catch (err) {
      throw err;
    }
    //console.log(type, location, data);
    switch (type) {
      case "Matrix2fv":
      case "Matrix2x3fv":
      case "Matrix2x4fv":
      case "Matrix3fv":
      case "Matrix3x2fv":
      case "Matrix3x4fv":
      case "Matrix4fv":
      case "Matrix4x2fv":
      case "Matrix4x3fv":
        gl[`uniform${type}`](location, false, [...data]);
        break;

      default:
        gl[`uniform${type}`](location, ...data);
    }
  }
}

export default Uniform;
