import { PlaneGeometry, Material, Primitive } from "nardgl";
import vertexShaderPartial from "./vertex.glsl";
import fragmentShaderPartial from "./fragment.glsl";

class Plane2 extends Primitive {
  constructor() {
    const geometry = new PlaneGeometry(2, 2, 50, 50);

    const material = new Material({
      texturesData: [
        {
          name: "u_texture",
          src: document.getElementById("texture").src,
          data: 0
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

export { Plane2 };