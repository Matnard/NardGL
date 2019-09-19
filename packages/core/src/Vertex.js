class Vertex {
  constructor(x = 0, y = 0, z = 0, w = 0) {
    this.position = { x, y, z, w };
    this._color = null;
    this._uv = null;
    this._normal = null;
  }

  get position() {
    return this._position;
  }

  set position(value) {
    this._position = Object.assign({}, { x: 0, y: 0, z: 0, w: 0 }, value);
  }
}

export { Vertex };
