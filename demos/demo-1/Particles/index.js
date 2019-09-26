import vertexShaderPartial from "./vertex.glsl";
import fragmentShaderPartial from "./fragment.glsl";
import { Primitive, Geometry, Material, PositionAttribute } from "nardgl";

const geometry = new Geometry();
geometry.setVertices([
  {
    x: 0,
    y: 0,
    z: 0,
    attributes: [new PositionAttribute(0, 0, 0)]
  },
  {
    x: 0.5,
    y: 0.5,
    z: 0,
    attributes: [new PositionAttribute(0.5, 0.5, 0)]
  },
  {
    x: -0.5,
    y: -0.5,
    z: 0,
    attributes: [new PositionAttribute(-0.5, -0.5, 0)]
  }
]);

console.log(geometry.getAttributeData());
console.log(Material.POINTS);
const material = new Material({
  uniformsData: [
    {
      name: "u_pointSize",
      type: "1f",
      value: 50,
      count: 1
    }
  ],
  primitiveType: Material.POINTS,
  vertexShader: vertexShaderPartial,
  fragmentShader: fragmentShaderPartial
});

class Particles extends Primitive {
  constructor() {
    super(null, geometry, material);
  }
}

export { Particles };
