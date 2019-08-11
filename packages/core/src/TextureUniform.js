import { Uniform } from "./Uniform";

class TextureUniform extends Uniform {
  constructor(conf) {
    super(conf);
    this.type = "1i";
    this.src = conf.src;
  }

  bind(gl, program) {
    this.gl = gl;
    this.program = program;
    this.texture = this.loadTexture(gl, this.src);
    return this;
  }

  toGLSL() {
    return `uniform sampler2D ${this.name};`;
  }

  loadTexture(gl, path) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Fill the texture with a 1x1 blue pixel.
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
    var image = new Image();
    image.src = path;
    image.addEventListener("load", function() {
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
    });

    return texture;
  }

  beforeDraw(dt) {
    // Tell WebGL we want to affect texture unit 0
    this.gl.activeTexture(this.gl.TEXTURE0);

    // Bind the texture to texture unit 0
    debugger;
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

    // Tell the shader we bound the texture to texture unit 0
    this.gl.uniform1i(programInfo.uniformLocations.u_texture, 0);
  }
}

export { TextureUniform };
