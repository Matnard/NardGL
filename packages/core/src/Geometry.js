import { Vertex } from "./Vertex";

//instanciate geometry with the [attributes] and how it's partitioned
//setting a vertex supplies

class Geometry {
  constructor(
    attributes = [Geometry.POSITION],
    partitionStyle = Geometry.NO_PARTITION
  ) {
    this.attributes = attributes;
    this.partitionStyle = partitionStyle;
  }

  setVertices(vertexArr) {
    //Array of Vertex Objects
    this.vertices = new Map();
    this.count = 0;
    if (vertexArr) {
      vertexArr.forEach(({ x, y, z, attributes }) => {
        this.addVertex(x, y, z, attributes);
      });
    }
  }

  addVertex(x, y, z, attributesTuple = []) {
    const attributesMap = new Map();
    attributesTuple.forEach(([key, value]) => {
      attributesMap.set(key, value);
    });
    this.vertices.set(JSON.stringify({ x, y, z }), {
      data: new Vertex(x, y, z),
      attributes: attributesMap,
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

  getAttributeData() {
    const attributesMap = Array.from(this.vertices.values())
      .map(({ attributes }) => attributes)
      .reduce((map, curr) => {
        curr.forEach((value, label) => {
          const entries = map.get(label) || [];
          map.set(label, [...entries, value]);
        });

        return map;
      }, new Map());

    const attributes = Array.from(attributesMap.entries()).map(
      ([name, data]) => ({
        name,
        componentType: 5126,
        count: this.vertices.size,
        data,
        type: null,
        stride: 0,
        offset: 0
      })
    );
    debugger;
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

  getCount(primitiveType) {
    return {
      0: this.vertices.size,
      4: this.vertices.size / 3
    }[primitiveType];
  }
}

Geometry.POSITION = "POSITION";
Geometry.NO_PARTITION = "NO_PARTITION";
Geometry.SIMPLE_PARTITION = "SIMPLE_PARTITION";

export { Geometry };
