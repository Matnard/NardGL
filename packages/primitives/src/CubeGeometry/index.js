import {
  Geometry,
  hexToNormalizedRGB,
  Vertex,
  PositionAttribute
} from "@nardgl/core";

class CubeGeometry extends Geometry {
  constructor(
    width = 2,
    height = 2,
    segmentsW = 1,
    segmentsH = 1,
    hexColor = 0x666666
  ) {
    super(Geometry.SIMPLE_PARTITION);
    this.width = width;
    this.height = height;
    this.segmentsW = segmentsW;
    this.segmentsH = segmentsH;
    //this.doubleSided = doubleSided;
    this._indices = [];
    this.rgbColor = hexToNormalizedRGB(hexColor);
    this.buildGeometry();
  }

  getIndicesData() {
    //if drawing triangles
    let srcData = Array.from({ length: 6 })
      .map((el, i) => {
        const faceId = 4 * i;
        return [faceId, faceId + 1, faceId + 2, faceId + 2, faceId + 3, faceId];
      })
      .flat();

    return {
      componentType: 5123,
      count: srcData.length,
      srcData,
      type: "SCALAR"
    };
  }

  buildGeometry() {
    this.setVertices([
      //positive x
      new Vertex(1, null, null, [new PositionAttribute(0.5, 0.5, 0.5)]),
      new Vertex(2, null, null, [new PositionAttribute(0.5, 0.5, -0.5)]),
      new Vertex(3, null, null, [new PositionAttribute(0.5, -0.5, -0.5)]),
      new Vertex(4, null, null, [new PositionAttribute(0.5, -0.5, 0.5)]),
      //negative x
      new Vertex(5, null, null, [new PositionAttribute(-0.5, 0.5, -0.5)]),
      new Vertex(6, null, null, [new PositionAttribute(-0.5, 0.5, 0.5)]),
      new Vertex(7, null, null, [new PositionAttribute(-0.5, -0.5, 0.5)]),
      new Vertex(8, null, null, [new PositionAttribute(-0.5, -0.5, -0.5)]),
      //positive y
      new Vertex(9, null, null, [new PositionAttribute(-0.5, 0.5, -0.5)]),
      new Vertex(10, null, null, [new PositionAttribute(0.5, 0.5, -0.5)]),
      new Vertex(11, null, null, [new PositionAttribute(0.5, 0.5, 0.5)]),
      new Vertex(12, null, null, [new PositionAttribute(-0.5, 0.5, 0.5)]),
      //negative y
      new Vertex(13, null, null, [new PositionAttribute(-0.5, -0.5, -0.5)]),
      new Vertex(14, null, null, [new PositionAttribute(0.5, -0.5, -0.5)]),
      new Vertex(15, null, null, [new PositionAttribute(0.5, -0.5, 0.5)]),
      new Vertex(16, null, null, [new PositionAttribute(-0.5, -0.5, 0.5)]),
      //positive z
      new Vertex(17, null, null, [new PositionAttribute(-0.5, 0.5, 0.5)]),
      new Vertex(18, null, null, [new PositionAttribute(0.5, 0.5, 0.5)]),
      new Vertex(19, null, null, [new PositionAttribute(0.5, -0.5, 0.5)]),
      new Vertex(20, null, null, [new PositionAttribute(-0.5, -0.5, 0.5)]),
      //negative z
      new Vertex(21, null, null, [new PositionAttribute(0.5, 0.5, -0.5)]),
      new Vertex(22, null, null, [new PositionAttribute(-0.5, 0.5, -0.5)]),
      new Vertex(23, null, null, [new PositionAttribute(-0.5, -0.5, -0.5)]),
      new Vertex(24, null, null, [new PositionAttribute(0.5, -0.5, -0.5)])
    ]);
  }
}

export { CubeGeometry };
