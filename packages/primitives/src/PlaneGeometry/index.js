import {
  Geometry,
  Vertex,
  PositionAttribute,
  CustomAttribute,
  hexToNormalizedRGB,
  NormalAttribute,
  UvAttribute
} from "@nardgl/core";

class PlaneGeometry extends Geometry {
  constructor(
    width = 2,
    height = 2,
    segmentsW = 1,
    segmentsH = 1,
    hexColor = 0x666666,
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
    this._indices = [];
    this.rgbColor = hexToNormalizedRGB(hexColor);
    this.buildGeometry();
  }

  getIndicesData() {
    //if drawing triangles
    let srcData = [];
    for (let y = 0; y <= this.segmentsH - 1; y++) {
      for (let x = 0; x <= this.segmentsW - 1; x++) {
        srcData = [
          ...srcData,
          this.getVertex(x, y, 0).index,
          this.getVertex(x + 1, y, 0).index,
          this.getVertex(x, y + 1, 0).index,

          this.getVertex(x + 1, y, 0).index,
          this.getVertex(x + 1, y + 1, 0).index,
          this.getVertex(x, y + 1, 0).index
        ];
      }
    }

    return {
      componentType: 5123,
      count: srcData.length,
      srcData,
      type: "SCALAR"
    };
  }

  buildGeometry() {
    let x, y;

    for (let yi = 0; yi <= this.segmentsH; yi++) {
      for (let xi = 0; xi <= this.segmentsW; xi++) {
        x = (xi / this.segmentsW - 0.5) * this.width;
        y = (yi / this.segmentsH - 0.5) * this.height;

        const u = xi / this.segmentsH;
        const v = -yi / this.segmentsW;
        //console.log(u, v);
        this.addVertex(
          xi,
          yi,
          0,
          new Vertex(x, y, 0, [
            new PositionAttribute(x, y, 0),
            new UvAttribute(u, v)
            //new NormalAttribute(0, 0, 1),
            // new CustomAttribute(
            //   "COLOR",
            //   "VEC4",
            //   5126,
            //   this.rgbColor.r,
            //   this.rgbColor.g,
            //   this.rgbColor.b,
            //   1
            // )
          ])
        );
      }
    }
  }
}

export { PlaneGeometry };
