import { TextureUniform } from "./TextureUniform";

class TextureCubeUniform extends TextureUniform {
  targets = [
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
    return `uniform samplerCube ${this.name};`;
  }

  loadTexture(gl, path) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

    this.targets.forEach(target => {
      //console.log(target, gl[target]);
      gl.texImage2D(
        gl[target],
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([Math.random(), Math.random(), Math.random(), 1])
      );
    });

    const img = new Image();
    const ctx = document.createElement("canvas").getContext("2d");
    img.crossOrigin = "anonymous";
    img.src = path;
    img.onerror = function(err) {
      console.log(err);
    };
    img.onload = () => {
      const width = img.width / 4;
      const height = width;
      ctx.canvas.width = width;
      ctx.canvas.height = height;

      // ctx.canvas.style.position = "fixed";
      // ctx.canvas.style.left = 0;
      // ctx.canvas.style.top = 0;
      // ctx.canvas.style.zIndex = 10;
      // document.body.append(ctx.canvas);

      const facesRects = [
        { x: 2, y: 1, width, height }, //+x
        { x: 0, y: 1, width, height }, //-x
        { x: 1, y: 0, width, height }, //+y
        { x: 1, y: 2, width, height }, //-Y
        { x: 1, y: 1, width, height }, //-z
        { x: 3, y: 1, width, height } //+z
      ];

      facesRects.map(({ x, y, width, height }, i) => {
        ctx.drawImage(
          img,
          x * width,
          y * height,
          width,
          height,
          0,
          0,
          width,
          height
        );

        gl.texImage2D(
          gl[this.targets[i]],
          0,
          gl.RGBA,
          width,
          height,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          ctx.canvas
        );
      });

      gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      gl.texParameteri(
        gl.TEXTURE_CUBE_MAP,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR_MIPMAP_LINEAR
      );
    };

    return texture;
  }

  preSet() {
    this.gl.activeTexture(this.gl.TEXTURE0 + this.textureUnit);
    this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.texture);
  }
}

export { TextureCubeUniform };
