class StaticGeometry {
  constructor(attributes, indices) {
    this.attributes = attributes;
    this.indices = indices;
  }
  getAttributeData() {
    return this.attributes;
  }

  getIndicesData() {
    return this.indices;
  }

  getCount() {
    return this.attributes[0].count; //POSITION, maybe..
  }
}

export { StaticGeometry };
