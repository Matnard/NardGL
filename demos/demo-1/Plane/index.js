import { PlaneGeometry, Material, Primitive } from "nardgl";
import vertexShaderPartial from "./vertex.glsl";
import fragmentShaderPartial from "./fragment.glsl";

class Plane extends Primitive {
  constructor() {
    const geometry = new PlaneGeometry(2, 2, 2, 2);

    const material = new Material({
      texturesData: [
        {
          name: "u_texture",
          src: document.getElementById("avatar").src
        }
      ],
      primitiveType: Material.TRIANGLES,
      vertexShader: vertexShaderPartial,
      fragmentShader: fragmentShaderPartial
    });

    super(null, geometry, material);
  }
}

export { Plane };
