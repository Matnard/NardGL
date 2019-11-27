import vertexShaderPartial from "./vertex.glsl";
import fragmentShaderPartial from "./fragment.glsl";
import { Primitive, Material, CubeGeometry } from "nardgl";

const geometry = new CubeGeometry();

const material = new Material({
  uniformsData: [],
  texturesData: [
    {
      name: "u_texture",
      src: document.getElementById("skybox").src,
      data: 0,
      textureCube: true
    }
  ],
  primitiveType: Material.TRIANGLES,
  vertexShader: vertexShaderPartial,
  fragmentShader: fragmentShaderPartial
});

class CubeMap extends Primitive {
  constructor() {
    super(geometry, material);
  }
}

export { CubeMap };
