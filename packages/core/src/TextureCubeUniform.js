import { TextureUniform } from "./TextureUniform";

class TextureCubeUniform extends TextureUniform {
  static targets = [
    "TEXTURE_CUBE_MAP_POSITIVE_X",
    "TEXTURE_CUBE_MAP_NEGATIVE_X",
    "TEXTURE_CUBE_MAP_POSITIVE_Y",
    "TEXTURE_CUBE_MAP_NEGATIVE_Y",
    "TEXTURE_CUBE_MAP_POSITIVE_Z",
    "TEXTURE_CUBE_MAP_NEGATIVE_Z"
  ];

  constructor(...args) {
    super(...args);
  }

  toGLSL() {
    return `uniform samplerCube ${this.name};\n`;
  }

  bind(gl, program) {
    this.gl = gl;
    this.program = program;
    this.texture = this.makeTexture(gl, ...this.img);
    this.textureUnit = this.data;
    return this;
  }

  makeTexture(gl, ...images) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    images.forEach((image, i) => {
      gl.texImage2D(
        gl[TextureCubeUniform.targets[i]],
        0,
        gl.RGBA,
        image.width,
        image.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
    });

    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(
      gl.TEXTURE_CUBE_MAP,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR_MIPMAP_LINEAR
    );

    return texture;
  }

  preSet() {
    this.gl.activeTexture(this.gl.TEXTURE0 + this.textureUnit);
    this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.texture);
  }
}

export { TextureCubeUniform };
