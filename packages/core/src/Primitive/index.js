import { Transform } from "../Transform";

class Primitive extends Transform {
  constructor(conf) {
    super();
    //stuff to access
    this.vao = null;
    this.hasRenderedOnce = false;
    this.needsUpdate = true;
    this.material = conf.material;
    this.indices = conf.indices || null;
    //draw stuff
    this.draw = conf.draw || {
      primitiveType: 4,
      offset: 0,
      count: 3
    };
    this.draw.count = conf.count;
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

  init(gl) {
    this.program = this.material.createProgram(gl);
    this.uniforms = this.material.bindUniforms(gl, this.program);
    this.attributes = this.material.bindAttributes(gl, this.program);

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
        normalize: true,
        stride: attribute.stride,
        offset: attribute.offset
      };

      if (this.indices) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
        const elementsConf = {
          target: gl.ELEMENT_ARRAY_BUFFER,
          srcData: new Uint16Array(this.indices.srcData),
          usage: gl.STATIC_DRAW
        };
        gl.bufferData(
          elementsConf.target,
          elementsConf.srcData,
          elementsConf.usage
        );
      }

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

    this.needsUpdate = false;
  }
}

export { Primitive };
