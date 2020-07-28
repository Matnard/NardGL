class Uniform {
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

  check() {
    if (!this.gl || !this.program) {
      throw new Error("Uniform needs to be bound to context and program");
    }
  }

  toGLSL() {
    const getType = () =>
      ({
        "1f": "float",
        "1fv": "float",
        "2f": "vec2",
        "2fv": "vec2",
        "3f": "vec3",
        "3fv": "vec3",
        "4f": "vec4",
        "4fv": "vec4",
        Matrix2fv: "mat2",
        Matrix3fv: "mat3",
        Matrix4fv: "mat4",
        "1i": typeof this.value === "boolean" ? "bool" : "int",
        "1iv": "int",
        "2i": "ivec2",
        "2iv": "ivec2",
        "3i": "ivec3",
        "3iv": "ivec3",
        "4i": "ivec4",
        "4iv": "ivec4",
        "1u": "uint",
        "1uv": "uint",
        "2u": "uvec2",
        "2uv": "uvec2",
        "3u": "uvec3",
        "3uv": "uvec3",
        "4u": "uvec4",
        "4uv": "uvec4",
      }[this.type]);

    return `uniform ${getType()} ${this.name}${
      this.count > 2 ? `[${this.count}];\n` : `;\n`
    }`;
  }

  getLocation() {
    this.check();
    return this.gl.getUniformLocation(this.program, this.name);
  }

  update(data = this.value) {
    this.check();
    this.passUniforms({
      location: this.getLocation(),
      type: this.type,
      data: [data],
    });
  }

  preSet() {}

  passUniforms(options) {
    this.check();
    const gl = this.gl;
    const { location, data, type } = options;

    try {
      gl[`uniform${type}`];
    } catch (err) {
      throw err;
    }
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
        gl[`uniform${type}`](location, false, [...data[0]]);
        break;

      default:
        gl[`uniform${type}`](location, ...data);
    }
    //this.preSet();
  }
}

export { Uniform };
