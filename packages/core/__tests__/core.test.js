import { Uniform } from "../src/Uniform";


const u = new Uniform({
  name: "u_resolution",
  type: "2fv",
  value: [0, 0],
  count: 1,
});

const u1 = new Uniform({
  name: "u_lorem",
  type: "1iv",
  value: [0],
  count: 1,
});

const u2 = new Uniform({
  name: "u_ipsum",
  type: "1i",
  value: false,
  count: 1,
});

test("prints vec2 uniform declaration", () => {
  expect(u.toGLSL()).toBe("uniform vec2 u_resolution;\n");
});

test("prints int uniform declaration", () => {
  expect(u1.toGLSL()).toBe("uniform int u_lorem;\n");
});

test("prints bool uniform declaration", () => {
  expect(u2.toGLSL()).toBe("uniform bool u_ipsum;\n");
});
