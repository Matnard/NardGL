import { Uniform } from "./Uniform";

class TextureUniform extends Uniform {
  constructor(conf) {
    super(conf);
    this.type = "1i";
    this.img = conf.img;
    this.data = conf.data;
    this.value = this.data;
  }

  bind(gl, program) {
    this.gl = gl;
    this.program = program;
    this.texture = this.makeTexture(gl, this.img);
    this.textureUnit = this.data;
    return this;
  }

  toGLSL() {
    return `uniform sampler2D ${this.name};`;
  }

  makeTexture(gl, image) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);

    return texture;
  }

  preSet() {
    this.gl.activeTexture(this.gl.TEXTURE0 + this.textureUnit);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
  }
}

export { TextureUniform };
