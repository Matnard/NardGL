import { PlaneGeometry, Material, Primitive } from "nardgl";
import vertexShaderPartial from "./vertex.glsl";
import fragmentShaderPartial from "./fragment.glsl";

class Plane extends Primitive {
  constructor() {
    const geometry = new PlaneGeometry(2, 2, 10, 10);

    const material = new Material({
      uniformsData: [],
      primitiveType: Material.POINTS,
      vertexShader: vertexShaderPartial,
      fragmentShader: fragmentShaderPartial
    });

    super(null, geometry, material);
  }
}

export { Plane };
