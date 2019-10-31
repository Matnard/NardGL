function parseObj(txt, textureSrc) {
  let verticesRegExp = /^v (-?\d+.?\d+) (-?\d+.?\d+) (-?\d+.?\d+)/gm;
  let uvsRegExp = /^vt (-?\d+.?\d+) (-?\d+.?\d+)/gm;
  let normalsRegExp = /^vn (-?\d+.?\d+) (-?\d+.?\d+) (-?\d+.?\d+)/gm;
  let polygonalRegExp = /^f (\d+\/\d+\/\d+) (\d+\/\d+\/\d+) (\d+\/\d+\/\d+)/gm;

  let positionsBank = [];
  let uvsBank = [];
  let normalsBank = [];
  let polys = [];

  {
    let match = verticesRegExp.exec(txt);
    while (match != null) {
      positionsBank.push(match.slice(1, match.length).map(parseFloat));
      match = verticesRegExp.exec(txt);
    }
  }

  {
    let match = uvsRegExp.exec(txt);
    while (match != null) {
      uvsBank.push(match.slice(1, match.length).map(parseFloat));
      match = uvsRegExp.exec(txt);
    }
  }

  {
    let match = normalsRegExp.exec(txt);
    while (match != null) {
      normalsBank.push(match.slice(1, match.length).map(parseFloat));
      match = normalsRegExp.exec(txt);
    }
  }

  {
    let match = polygonalRegExp.exec(txt);
    while (match != null) {
      polys.push(match.slice(1, match.length));
      match = polygonalRegExp.exec(txt);
    }
  }

  let attribs = polys
    .map(poly => {
      let vertices = poly.map(vertex => {
        let data = vertex.split("/").map(parseFloat);
        return {
          positions: positionsBank[data[0] - 1],
          uvs: uvsBank[data[1] - 1],
          normals: normalsBank[data[2] - 1]
        };
      });
      return vertices;
    })
    .flat()
    .reduce(
      function(a, b) {
        let positions = a.positions.concat(b.positions);
        let uvs = a.uvs.concat(b.uvs);
        let normals = a.normals.concat(b.normals);
        return {
          positions,
          uvs,
          normals
        };
      },
      {
        positions: [],
        uvs: [],
        normals: []
      }
    );

  console.log(attribs);

  return {
    attributes: [
      {
        name: "POSITION",
        componentType: 5126,
        count: attribs.positions.length / 3,
        type: "VEC3",
        srcData: attribs.positions
      },
      {
        name: "UV",
        componentType: 5126,
        count: attribs.positions.length / 2,
        type: "VEC2",
        srcData: attribs.uvs
      }
    ],
    //   indices: {
    //   bufferView: 3,
    //   componentType: 5123,
    //   count: 36,
    //   type: "SCALAR",
    //   srcData: [
    //     ..indices here
    //   ]
    // },
    material: {
      name: "Material.001",
      pbrMetallicRoughness: {
        baseColorTexture: {
          texture: textureSrc
        },
        metallicFactor: 0,
        roughnessFactor: 0.5
      }
    }
  };
}

export { parseObj };
