import vertexShaderPartial from "./vertex.glsl";
import fragmentShaderPartial from "./fragment.glsl";
import { Primitive, Material, CubeGeometry } from "nardgl";

const geometry = new CubeGeometry();

console.log(geometry, geometry.getIndicesData());

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
    super(null, geometry, material);
  }

  beforeDraw() {
    this.setUniform("u_modelMatrix", this.matrix);
  }
}

export { CubeMap };