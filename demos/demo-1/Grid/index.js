import fragmentShaderPartial from "./fragment.glsl";
import vertexShaderPartial from "./vertex.glsl";
import { Geometry, Vertex, CustomAttribute, Material, Primitive } from "nardgl";

const geometry = new Geometry(Geometry.SIMPLE_PARTITION);

let subDiv = 14;
let step = 2 / subDiv;

const subs = [];

const addToSubs = (x, y, z, colorIndex) => {
  subs.push(
    new Vertex(x, y, z, [
      new CustomAttribute("POSITION", "VEC3", 5126, x, y, z),
      new CustomAttribute("COLORS", "SCALAR", 5126, colorIndex)
    ])
  );
};

for (var i = step; i <= 1; i += step) {
  addToSubs(i, 1, 0, 0);
  addToSubs(i, -1, 0, 0);
  addToSubs(-i, 1, 0, 0);
  addToSubs(-i, -1, 0, 0);

  addToSubs(1, i, 0, 0);
  addToSubs(-1, i, 0, 0);
  addToSubs(1, -i, 0, 0);
  addToSubs(-1, -i, 0, 0);
}

geometry.setVertices([
  new Vertex(0, -1, 0, [
    new CustomAttribute("POSITION", "VEC3", 5126, 0, -1, 0),
    new CustomAttribute("COLORS", "SCALAR", 5126, 3)
  ]),
  new Vertex(0, 1, 0, [
    new CustomAttribute("POSITION", "VEC3", 5126, 0, 1, 0),
    new CustomAttribute("COLORS", "SCALAR", 5126, 3)
  ]),
  new Vertex(0, 0, -1, [
    new CustomAttribute("POSITION", "VEC3", 5126, 0, 0, -1),
    new CustomAttribute("COLORS", "SCALAR", 5126, 2)
  ]),
  new Vertex(0, 0, 1, [
    new CustomAttribute("POSITION", "VEC3", 5126, 0, 0, 1),
    new CustomAttribute("COLORS", "SCALAR", 5126, 2)
  ]),
  new Vertex(-1, 0, 0, [
    new CustomAttribute("POSITION", "VEC3", 5126, -1, 0, 0),
    new CustomAttribute("COLORS", "SCALAR", 5126, 1)
  ]),
  new Vertex(1, 0, 0, [
    new CustomAttribute("POSITION", "VEC3", 5126, 1, 0, 0),
    new CustomAttribute("COLORS", "SCALAR", 5126, 1)
  ]),
  ...subs
]);

const material = new Material({
  uniformsData: [
    {
      name: "u_colors",
      type: "3fv",
      value: [0.8, 0.8, 0.8, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      count: 4
    }
  ],
  primitiveType: Material.LINES,
  vertexShader: vertexShaderPartial,
  fragmentShader: fragmentShaderPartial
});

class Grid extends Primitive {
  constructor() {
    super(geometry, material);
  }

  beforeDraw() {
    this.setUniform("u_modelMatrix", this.matrix);
  }
}

export { Grid };
