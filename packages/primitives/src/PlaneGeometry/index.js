import { Geometry, Vertex, PositionAttribute } from "@nardgl/core";

class PlaneGeometry extends Geometry {
  constructor(
    width = 2,
    height = 2,
    segmentsW = 1,
    segmentsH = 1,
    yUp = true,
    doubleSided = false
  ) {
    super();
    this.width = width;
    this.height = height;
    this.segmentsW = segmentsW;
    this.segmentsH = segmentsH;
    this.yUp = yUp;
    this.doubleSided = doubleSided;

    this.buildGeometry();
  }

  buildGeometry() {
    let x, y;

    for (let yi = 0; yi <= this.segmentsH; yi++) {
      for (let xi = 0; xi <= this.segmentsW; xi++) {
        x = (xi / this.segmentsW - 0.5) * this.width;
        y = (yi / this.segmentsH - 0.5) * this.height;
        this.addVertex(
          x,
          y,
          0,
          new Vertex(x, y, 0, [new PositionAttribute(x, y, 0)])
        );
      }
    }
  }
}

export { PlaneGeometry };
