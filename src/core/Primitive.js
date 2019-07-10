import m4 from "./m4";

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

    this.matrix = m4.identity();

    this.translation = {
      x: 0,
      y: 0,
      z: 0
    };

    this.rotation = {
      x: 0,
      y: 0,
      z: 0
    };

    this.scale = {
      x: 1,
      y: 1,
      z: 1
    };

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

  computeMatrix(viewProjectionMatrix = m4.identity()) {
    //this.beforeComputeMatrix();
    this.matrix = viewProjectionMatrix;

    this.matrix = m4.translate(
      this.matrix,
      this.translation.x,
      this.translation.y,
      this.translation.z
    );
    this.matrix = m4.rotateX(this.matrix, this.rotation.x);
    this.matrix = m4.rotateY(this.matrix, this.rotation.y);
    this.matrix = m4.rotateZ(this.matrix, this.rotation.z);

    this.matrix = m4.scale(
      this.matrix,
      this.scale.x,
      this.scale.y,
      this.scale.z
    );
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
