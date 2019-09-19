import { Vertex } from "./Vertex";

class Geometry {
  constructor(vertexArr) {
    //Array of Vertex Objects
    this.vertices = new Map();
    this.count = 0;
    if (vertexArr) {
      vertexArr.forEach(vertex => {
        const { x, y, z } = vertex.position;
        this.addVertex(x, y, z);
      });
    }
  }

  addVertex(x, y, z) {
    this.vertices.set(JSON.stringify({ x, y, z }), {
      data: new Vertex(x, y, z),
      index: this.count++
    });
  }

  getVertex(x, y, z) {
    this.vertices.get(JSON.stringify({ x, y, z }));
  }

  // get indices() { // implemented by the custom geometry
  //   return {
  //     componentType: 5123,
  //     count: null,
  //     srcData: null,
  //     type: "SCALAR"
  //   }
  // }

  getAttributes(conf) {
    // const defaults = {
    //   position: true,
    //   uv: false,
    //   normal: false
    // };
    // const options = Object.assign({}, defaults, conf);

    // console.log(options);

    const srcData = Array.from(this.vertices.values())
      .map(({ data }) => [data.position.x, data.position.y, data.position.z])
      .flat();
    return [
      {
        name: "POSITION",
        componentType: 5126,
        count: this.vertices.size,
        srcData,
        type: "VEC3",
        stride: 0,
        offset: 0
      }
    ];
  }
}

export { Geometry };
