import { Particle } from "./Particle";
import { Line } from "./Line";
import { Point } from "./Point";

class Graphics {
  pointer = new Point();

  particles = [];
  lines = [];

  drawParticle(color, size) {
    this.particles.push(new Particle(...this.pointer, color, size));
  }

  moveTo(x, y, z) {
    this.pointer = new Point(x, y, z);
  }

  lineTo(x, y, z, color) {
    this.lines.push(new Line(this.pointer, new Point(x, y, z), color));
    this.moveTo(x, y, z);
  }
}

export { Graphics };
