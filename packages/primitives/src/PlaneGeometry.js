class PlaneGeometry {
  constructor(
    width = 1,
    height = 1,
    segmentsW = 1,
    segmentsH = 1,
    yUp = true,
    doubleSided = false
  ) {
    this.width = width;
    this.height = height;
    this.segmentsW = segmentsW;
    this.segmentsH = segmentsH;
    this.yUp = yUp;
    this.doubleSided = doubleSided;
  }
}

export { PlaneGeometry };
