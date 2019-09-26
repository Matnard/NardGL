import { Vertex } from "./Vertex";

const noPartitionAttributeReduceFn = function(vertices) {
  return (map, curr) => {
    curr.forEach(attribute => {
      const entries = map.get(attribute.name) || { srcData: [] };
      map.set(attribute.name, {
        name: attribute.name,
        componentType: attribute.componentType,
        count: vertices.size,
        type: attribute.type,
        srcData: [...entries.srcData, ...attribute.data],
        stride: 0,
        offset: 0
      });
    });

    return map;
  };
};

const simplePartitionAttributeReduceFn = function(vertices) {
  return (map, curr) => {
    curr.forEach(attribute => {
      const entries = map.get(attribute.name) || { srcData: [] };
      map.set(attribute.name, {
        name: attribute.name,
        componentType: attribute.componentType,
        count: vertices.size,
        type: attribute.type
      });
    });

    return map;
  };
};

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

  addVertex(x, y, z, attributes) {
    this.vertices.set(JSON.stringify({ x, y, z }), {
      attributes,
      index: this.count++
    });
  }

  getVertex(x, y, z) {
    this.vertices.get(JSON.stringify({ x, y, z }));
  }

  getAttributeData() {
    const attributesMap = Array.from(this.vertices.values())
      .map(({ attributes }) => attributes)
      .reduce(noPartitionAttributeReduceFn(this.vertices), new Map());

    return Array.from(attributesMap.values());
  }

  getCount(primitiveType) {
    return {
      0: this.vertices.size,
      4: this.vertices.size / 3
    }[primitiveType];
  }

  // get indices() { // implemented by the custom geometry
  //   return {
  //     componentType: 5123,
  //     count: null,
  //     srcData: null,
  //     type: "SCALAR"
  //   }
  // }
}

Geometry.POSITION = "POSITION";
Geometry.NO_PARTITION = "NO_PARTITION";
Geometry.SIMPLE_PARTITION = "SIMPLE_PARTITION";

export { Geometry };
