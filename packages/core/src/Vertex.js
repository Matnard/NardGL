class Vertex {
  constructor(x, y, z, attributes) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.attributes = attributes;
  }

  get attributesStride() {
    return this.attributes.reduce((acc, { spaceTaken }) => {
      console.log(spaceTaken);
      return acc + spaceTaken;
    }, 0);
  }
}

export { Vertex };
