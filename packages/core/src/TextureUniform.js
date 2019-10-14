import { Uniform } from "./Uniform";

class TextureUniform extends Uniform {
  constructor(conf) {
    super(conf);
    this.type = "1i";
    this.src = conf.src;
    this.img = conf.img;
    this.data = conf.data;
    this.value = this.data;
  }

  bind(gl, program) {
    this.gl = gl;
    this.program = program;
    this.texture = this.loadTexture(gl, this.src, this.img);
    this.textureUnit = this.data;
    return this;
  }

  toGLSL() {
    return `uniform sampler2D ${this.name};`;
  }

  loadTexture(gl, path, loadedImg) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Fill the texture with a 1x1 gray pixel.
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0.2])
    );

    // Asynchronously load an image
    const image = loadedImg || new Image();

    if (!loadedImg) {
      image.src = path;
      image.addEventListener("load", onLoad);
    } else {
      onLoad();
      return texture;
    }

    function onLoad() {
      // Now that the image has loaded make copy it to the texture.
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
      gl.generateMipmap(gl.TEXTURE_2D);
    }

    return texture;
  }

  preSet() {
    this.gl.activeTexture(this.gl.TEXTURE0 + this.textureUnit);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
  }
}

export { TextureUniform };
