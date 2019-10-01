import vertexShaderPartial from "./vertex.glsl";
import fragmentShaderPartial from "./fragment.glsl";
import {
  Primitive,
  Geometry,
  Material,
  PositionAttribute,
  Vertex
} from "nardgl";

const geometry = new Geometry();
geometry.setVertices([
  new Vertex(0, 0, 0, [new PositionAttribute(0, 0, 0)]),
  new Vertex(0.5, 0.5, 0, [new PositionAttribute(0.5, 0.5, 0)]),
  new Vertex(-0.5, -0.5, 0, [new PositionAttribute(-0.5, -0.5, 0)])
]);

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
