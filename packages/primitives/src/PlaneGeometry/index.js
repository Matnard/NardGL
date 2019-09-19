import { Geometry } from "@nardgl/core/src/Geometry";

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
        this.addVertex(x, y, 0);
      }
    }
  }

  //move this to material add provide differently depending on drawing primitive
  getAttributeData() {
    if (!this.vertices) {
      throw new Error("Run buildGeometry first");
    }
    let x, y;
    const indices = [];
    const vertices = [];
    for (let yi = 0; yi <= this.segmentsH - 1; yi++) {
      for (let xi = 0; xi <= this.segmentsW - 1; xi++) {
        x = (xi / this.segmentsW - 0.5) * this.width;
        y = (yi / this.segmentsH - 0.5) * this.height;

        vertices.push([x, y, 0]);
        indices.push(this.getVertex({ x, y }));
        vertices.push([x + 1, y, 0]);
        indices.push(this.getVertex({ x: x + 1, y }));
        vertices.push([x + 1, y + 1, 0]);
        indices.push(this.getVertex({ x: x + 1, y: y + 1 }));
        //-------------
        vertices.push([x + 1, y + 1]);
        indices.push(this.getVertex({ x: x + 1, y: y + 1 }));
        vertices.push([x, y + 1]);
        indices.push(this.getVertex({ x, y: y + 1 }));
        vertices.push([x, y]);
        indices.push(this.getVertex({ x, y }));
      }
    }

    return [
      {
        name: "POSITION",
        componentType: 5126,
        count: vertices.length,
        type: "VEC3",
        srcData: vertices.flat()
      },
      {
        name: "indices",
        componentType: 5123,
        count: indices.length,
        type: "SCALAR",
        srcData: indices
      }
    ];
  }
}

export { PlaneGeometry };
