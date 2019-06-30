import { createProgramFromSource, getSize, getTypedArray } from "./utils";

class Primitive {
  constructor(gl, conf) {
    this.gl = gl;
    //stuff to access
    this.vao = null;
    this.program = null;
    this.uniforms = conf.uniforms || null;
    this.transforms = [];

    this.vertexShaderSrc = conf.vertexShaderSrc || null;
    this.fragmentShaderSrc = conf.fragmentShaderSrc || null;

    //setup stuff
    this.attributes = conf.attributes || null;
    this.indices = conf.indices || null;

    //draw stuff
    this.draw = conf.draw;

    this.init();
  }

  afterInit() {
    console.log("---------------------------------------------");
  }

  updateUniform(name, value) {
    const type = this.uniforms.find(u => u.name === name).type;
    const location = this.uniformLocations.find(u => u.name === name).location;
    this.passUniforms({
      data: [value],
      location,
      type
    });
  }

  setAttributeLocations() {
    const gl = this.gl;
    this.attributeLocations = this.attributes.map(attribute => ({
      name: attribute.name,
      location: gl.getAttribLocation(this.program, attribute.name)
    }));
  }

  setUniformLocations() {
    const gl = this.gl;
    this.uniformLocations = this.uniforms.map(uniform => ({
      name: uniform.name,
      location: gl.getUniformLocation(this.program, uniform.name)
    }));
  }

  passUniforms(options) {
    const gl = this.gl;
    const { location, data, type } = options;

    try {
      gl[`uniform${type}`];
    } catch (err) {
      throw err;
    }
    //console.log(type, data);
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

  init() {
    const gl = this.gl;
    this.program = createProgramFromSource(
      gl,
      this.vertexShaderSrc,
      this.fragmentShaderSrc
    );

    this.setAttributeLocations();
    this.setUniformLocations();

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      getTypedArray(
        this.attributes[0].srcData,
        this.attributes[0].componentType
      ),
      gl.STATIC_DRAW
    );

    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    //this.attributes.forEach((attribute, i) => {
    let i = 0;
    gl.enableVertexAttribArray(this.attributeLocations[i].location);

    const conf = {
      size: getSize(this.attributes[i].type), //3 comps per iteration
      type: this.attributes[i].componentType, //the data is 32bits floats
      normalize: false, //don't normalize the data
      stride: this.attributes[i].stride, // 0 = move forward size * sizeof(type) each iteration to get the next position
      offset: this.attributes[i].offset // start at the beginning of the buffer
    };

    gl.vertexAttribPointer(
      this.attributeLocations[i].location,
      conf.size,
      conf.type,
      conf.normalize,
      conf.stride,
      conf.offset
    );
    //});

    this.afterInit();
  }
}

export default Primitive;
