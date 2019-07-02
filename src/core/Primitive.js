import { createProgramFromSource } from "./utils";
import Attribute from "./Attribute";
import Uniform from "./Uniform";

class Primitive {
  constructor(gl, conf) {
    this.gl = gl;
    //stuff to access
    this.vao = null;
    this.program = createProgramFromSource(
      gl,
      conf.vertexShaderSrc,
      conf.fragmentShaderSrc
    );
    this.uniforms = conf.uniforms.map(
      conf => new Uniform(this.gl, this.program, conf)
    );
    this.transforms = [];

    //setup stuff
    this.attributes = conf.attributes.map(
      conf => new Attribute(this.gl, this.program, conf)
    );

    this.indices = conf.indices || null;

    //draw stuff
    this.draw = conf.draw;

    this.init();
  }

  afterInit() {
    //console.log("---------------------------------------------");
  }

  updateUniform(name, data) {
    this.uniforms.find(u => u.name === name).update(data);
  }

  init() {
    const gl = this.gl;

    this.attributes.forEach((attribute, i) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, attribute.array, gl.STATIC_DRAW);

      this.vao = gl.createVertexArray();
      gl.bindVertexArray(this.vao);

      gl.enableVertexAttribArray(attribute.location);

      const conf = {
        size: attribute.size,
        type: attribute.componentType,
        normalize: false,
        stride: attribute.stride,
        offset: attribute.offset
      };

      gl.vertexAttribPointer(
        attribute.location,
        conf.size,
        conf.type,
        conf.normalize,
        conf.stride,
        conf.offset
      );
    });

    this.afterInit();
  }
}

export default Primitive;
