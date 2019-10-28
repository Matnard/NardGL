const noPartitionAttributeReduceFn = function(vertices) {
  return (map, curr) => {
    curr.forEach(attribute => {
      const entries = map.get(attribute.name) || { srcData: [] };

      attribute.elementsPerAttribute = attribute.data.length;
      map.set(attribute.name, {
        name: attribute.name,
        componentType: attribute.componentType,
        type: attribute.type,
        count: vertices.size,
        srcData: [...entries.srcData, ...attribute.data],
        stride: 0,
        offset: 0,
        spaceTaken: attribute.spaceTaken
      });
    });

    return map;
  };
};

const simplePartitionAttributeReduceFn = function(vertices) {
  return (map, curr) => {
    curr.attributes.forEach(attribute => {
      let entry = map.get(attribute.name);

      attribute.count = vertices.size;

      if (entry && attribute.srcData) {
        entry.srcData = [...entry.srcData, ...attribute.srcData];
      }

      if (!entry) {
        map.set(attribute.name, attribute);
        entry = attribute;
      }
    });

    return map;
  };
};

const getAttributeOffset = function(attributes, i) {
  const slice = attributes.slice(0, i);
  return slice.length === 0
    ? 0
    : slice.reduce((acc, curr) => acc + curr.spaceTaken, 0);
};

class Geometry {
  static POSITION = "POSITION";
  static NO_PARTITION = "NO_PARTITION";
  static SIMPLE_PARTITION = "SIMPLE_PARTITION";

  constructor(partitionStyle = Geometry.NO_PARTITION) {
    this.partitionStyle = partitionStyle;
    this.vertices = new Map();
    this.count = 0;
  }

  setVertices(vertexArr) {
    //Array of Vertex Objects
    this.vertices = new Map();
    this.count = 0;
    if (vertexArr) {
      vertexArr.forEach(vertex => {
        const { x, y, z } = vertex;
        this.addVertex(x, y, z, vertex);
      });
    }
  }

  addVertex(x, y, z, vertex) {
    vertex.index = this.count++;
    this.vertices.set(JSON.stringify({ x, y, z }), vertex);
  }

  getVertex(x, y, z) {
    return this.vertices.get(JSON.stringify({ x, y, z }));
  }

  getAttributeData() {
    let attributesMap;
    if (this.partitionStyle === Geometry.NO_PARTITION) {
      attributesMap = Array.from(this.vertices.values())
        .map(({ attributes }) => attributes)
        .reduce(noPartitionAttributeReduceFn(this.vertices), new Map());
    } else {
      attributesMap = Array.from(this.vertices.values())
        .map(vertex => {
          const { attributes } = vertex;
          attributes[0].srcData = [];
          const stride = attributes.reduce((acc, curr) => {
            return acc + curr.spaceTaken;
          }, 0);
          attributes.forEach((current, i, attributes) => {
            attributes[0].srcData = [...attributes[0].srcData, ...current.data];
            current.stride = stride;
            current.offset = getAttributeOffset(attributes, i);
          });

          return vertex;
        })
        .reduce(simplePartitionAttributeReduceFn(this.vertices), new Map());
    }

    return Array.from(attributesMap.values()).map(attribute => {
      const obj = {
        name: attribute.name,
        componentType: attribute.componentType,
        type: attribute.type,
        count: attribute.count,
        stride: attribute.stride,
        offset: attribute.offset,
        spaceTaken: attribute.spaceTaken
      };

      if (attribute.srcData) {
        obj["srcData"] = attribute.srcData;
      }

      return obj;
    });
  }

  getIndicesData() {
    return null;
  }

  getCount(primitiveType) {
    return {
      0: this.vertices.size,
      1: this.vertices.size,
      4: this.vertices.size
    }[primitiveType];
  }
}

export { Geometry };
