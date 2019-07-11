import Transform from "./Transfom";

class Primitive {
  constructor(gl, conf) {
    this.gl = gl;
    //stuff to access
    this.vao = null;
    this.hasRenderedOnce = false;

    this.program = conf.material.createProgram(this.gl);

    //setup stuff
    this.uniforms = conf.material.uniforms;
    this.uniforms.forEach(uniform => {
      uniform.bind(this.gl, this.program);
    });

    this.attributes = conf.material.attributes;
    this.attributes.forEach(attribute => {
      attribute.bind(this.gl, this.program);
    });

    this.indices = conf.indices || null;

    //draw stuff
    this.draw = conf.draw || {};

    this.transform = new Transform();

    this.init();
  }

  get matrix() {
    return this.transform.matrix;
  }

  get translation() {
    return this.transform.translation;
  }

  get rotation() {
    return this.transform.rotation;
  }

  get scale() {
    return this.transform.scale;
  }

  computeMatrix(m) {
    this.transform.computeMatrix(m);
  }

  setUniform(name, data) {
    this.uniforms.find(u => u.name === name).value = data;
  }

  updateUniform(name, value) {
    this.uniforms.find(u => u.name === name).update(value);
  }

  updateUniforms() {
    this.uniforms.forEach(uniform => {
      uniform.update();
    });
  }

  beforeDraw(dt) {}

  init() {
    const gl = this.gl;

    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    this.attributes.forEach(attribute => {
      if (!!attribute.srcData) {
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, attribute.array, gl.STATIC_DRAW);
      }

      const conf = {
        location: attribute.location,
        size: attribute.size,
        type: attribute.componentType,
        normalize: false,
        stride: attribute.stride,
        offset: attribute.offset
      };

      gl.vertexAttribPointer(
        conf.location,
        conf.size,
        conf.type,
        conf.normalize,
        conf.stride,
        conf.offset
      );
      gl.enableVertexAttribArray(attribute.location);
    });
  }
}

export default Primitive;
