import vertexShaderPartial from "./vertex.glsl";
import fragmentShaderPartial from "./fragment.glsl";
import { Primitive, Material, CubeGeometry } from "nardgl";

class TexturedCube extends Primitive {
  constructor(...textures) {
    const geometry = new CubeGeometry();

    const material = new Material({
      uniformsData: [],
      texturesData: [
        {
          name: "u_texture",
          img: textures,
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
}

export { TexturedCube };
