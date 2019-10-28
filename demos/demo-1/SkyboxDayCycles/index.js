import vertexShaderPartial from "./vertex.glsl";
import fragmentShaderPartial from "./fragment.glsl";
import { Primitive, Material, CubeGeometry } from "nardgl";

class SkyboxDayCycles extends Primitive {
  constructor(texture1, texture2) {
    const geometry = new CubeGeometry();

    const material = new Material({
      uniformsData: [],
      texturesData: [
        {
          name: "u_texture_day",
          img: SkyboxDayCycles.atlasToCubeFaces(texture1),
          data: 1,
          textureCube: true
        },
        {
          name: "u_texture_night",
          img: SkyboxDayCycles.atlasToCubeFaces(texture2),
          data: 0,
          textureCube: true
        }
      ],
      primitiveType: Material.TRIANGLES,
      vertexShader: vertexShaderPartial,
      fragmentShader: fragmentShaderPartial
    });
    super(geometry, material);
  }

  static cloneCanvas(oldCanvas) {
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.canvas.width = oldCanvas.width;
    ctx.canvas.height = oldCanvas.height;
    ctx.drawImage(oldCanvas, 0, 0);
    return ctx.canvas;
  }

  static atlasToCubeFaces(image) {
    const ctx = document.createElement("canvas").getContext("2d");

    const width = image.width / 4;
    const height = width;

    ctx.canvas.width = width;
    ctx.canvas.height = height;
    ctx.canvas.setAttribute("id", "nardvas");

    const facesRects = [
      { x: 2, y: 1, width, height }, //+x
      { x: 0, y: 1, width, height }, //-x
      { x: 1, y: 0, width, height }, //+y
      { x: 1, y: 2, width, height }, //-Y
      { x: 1, y: 1, width, height }, //-z
      { x: 3, y: 1, width, height } //+z
    ];

    return facesRects.map(({ x, y, width, height }) => {
      ctx.drawImage(
        image,
        x * width,
        y * height,
        width,
        height,
        0,
        0,
        width,
        height
      );

      return SkyboxDayCycles.cloneCanvas(ctx.canvas);
    });
  }

  beforeDraw() {
    this.setUniform("u_modelMatrix", this.matrix);
  }
}

export { SkyboxDayCycles };
