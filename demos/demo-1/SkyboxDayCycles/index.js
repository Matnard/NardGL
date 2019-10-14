import vertexShaderPartial from "./vertex.glsl";
import fragmentShaderPartial from "./fragment.glsl";
import { Primitive, Material, CubeGeometry } from "nardgl";

class SkyboxDayCycles extends Primitive {
  constructor(textture1, texture2) {
    const geometry = new CubeGeometry();

    const material = new Material({
      uniformsData: [],
      texturesData: [
        {
          name: "u_texture_day",
          img: textture1,
          data: 1,
          textureCube: true
        },
        {
          name: "u_texture_night",
          img: texture2,
          data: 0,
          textureCube: true
        }
      ],
      primitiveType: Material.TRIANGLES,
      vertexShader: vertexShaderPartial,
      fragmentShader: fragmentShaderPartial
    });
    super(null, geometry, material);
  }

  beforeDraw() {
    this.setUniform("u_modelMatrix", this.matrix);
  }
}

export { SkyboxDayCycles };
