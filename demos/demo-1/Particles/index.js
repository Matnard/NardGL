import vertexShaderPartial from "./vertex.glsl";
import fragmentShaderPartial from "./fragment.glsl";
import { Primitive, Geometry, Material } from "nardgl";

const geometry = new Geometry();
geometry.setVertices([
  {
    x: 0,
    y: 0,
    z: 0,
    attributes: [["POSITION", { x: 0, y: 0, z: 0 }], ["UV", { u: 0, v: 0 }]]
  },
  {
    x: 0.5,
    y: 0.5,
    z: 0,
    attributes: [
      ["POSITION", { x: 0.5, y: 0.5, z: 0 }],
      ["UV", { u: 0.5, v: 0.5 }]
    ]
  },
  {
    x: -0.5,
    y: -0.5,
    z: 0,
    attributes: [
      ["POSITION", { x: -0.5, y: -0.5, z: 0 }],
      ["UV", { u: -0.5, v: -0.5 }]
    ]
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
