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

const randomParticles = Array.from({ length: 20 }).map(p => {
  const x = (Math.random() - 0.5) * 5;
  const y = (Math.random() - 0.5) * 5;
  const z = (Math.random() - 0.5) * 5;
  return new Vertex(x, y, z, [new PositionAttribute(x, y, z)]);
});

geometry.setVertices(randomParticles);

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
    super(geometry, material);
  }

  beforeDraw() {
    this.setUniform("u_modelMatrix", this.matrix);
  }
}

export { Particles };
