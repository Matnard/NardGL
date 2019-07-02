import { createProgramFromSource } from "./utils";
import Attribute from "./Attribute";
import Uniform from "./Uniform";

class Primitive {
  constructor(gl, conf) {
    this.gl = gl;
    //stuff to access
    this.vao = null;
    this.hasRenderedOnce = false;

    this.program = createProgramFromSource(
      gl,
      conf.vertexShaderSrc,
      conf.fragmentShaderSrc
    );

    //setup stuff
    this.uniforms = conf.uniforms;
    this.uniforms.forEach(uniform => {
      uniform.bind(this.gl, this.program);
    });

    this.attributes = conf.attributes;
    this.attributes.forEach(attribute => {
      attribute.bind(this.gl, this.program);
    });

    this.indices = conf.indices || null;

    //draw stuff
    this.draw = conf.draw || {};

    this.init();
  }

  afterInit() {
    //console.log("---------------------------------------------");
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

    this.afterInit();
  }
}

export default Primitive;
