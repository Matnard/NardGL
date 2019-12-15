import { PlaneGeometry, Material, Primitive } from "nardgl";
import vertexShaderPartial from "./vertex.glsl";
import fragmentShaderPartial from "./fragment.glsl";

class Plane extends Primitive {
  constructor(img) {
    const geometry = new PlaneGeometry(3, (3 * 270) / 480, 1, 1);

    const material = new Material({
      texturesData: [
        {
          name: "u_texture",
          img,
          data: 0
        }
      ],
      primitiveType: Material.TRIANGLES,
      vertexShader: vertexShaderPartial,
      fragmentShader: fragmentShaderPartial
    });

    super(geometry, material);
  }
}

export { Plane };
