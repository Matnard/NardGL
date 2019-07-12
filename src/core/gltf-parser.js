class GltfParser {
  constructor(gltf) {
    gltf.buffers.forEach(b => {
      b.data = this.parseB64Buffer(b);
    });

    gltf.accessors.forEach((accessor, i) => {
      let itemsPerType = this.getItemsPerType(accessor.type);
      let elementBytesLength = this.getComponentArrayType(
        accessor.componentType
      ).BYTES_PER_ELEMENT;
      let typedGetter = this.getDvMethodToRun(accessor.componentType);

      let bufferId = gltf.bufferViews[accessor.bufferView].buffer;
      let dv = gltf.buffers[bufferId].data;
      let offset = gltf.bufferViews[accessor.bufferView].byteOffset;

      accessor.srcData = Array.from({
        length: itemsPerType * accessor.count
      }).map((el, i) => {
        var loopOffset = offset + Math.max(0, elementBytesLength * i);
        return dv[typedGetter](loopOffset, true);
      });

      //console.log(accessor.data.map(d => d.toFixed(1)));
    });

    this.gltf = gltf;
  }

  parseB64Buffer(buffer) {
    let b64 = buffer.uri;

    let byteCharacters = atob(b64.split(",")[1]);
    let dv = new DataView(new ArrayBuffer(byteCharacters.length));

    Array.from(byteCharacters).forEach((char, i) => {
      dv.setUint8(i, char.charCodeAt(0));
    });

    return dv;
  }

  getComponentArrayType(id) {
    return {
      5123: Uint16Array,
      5126: Float32Array
    }[id];
  }

  getDvMethodToRun(id) {
    return {
      5123: "getUint16",
      5126: "getFloat32"
    }[id];
  }

  getItemsPerType(type) {
    let itemsPerType = null;
    switch (type) {
      case "VEC3": {
        itemsPerType = 3;
        break;
      }

      case "VEC4": {
        itemsPerType = 4;
        break;
      }

      case "SCALAR": {
        itemsPerType = 1;
        break;
      }

      default:
        throw new Error("Needs a type");
    }

    return itemsPerType;
  }

  getPrimitives(meshId = 0) {
    //from mesh id
    const primitives = this.gltf.meshes[meshId].primitives;

    primitives.forEach(primitive => {
      primitive.attributes = Object.keys(primitive.attributes).map(name => ({
        name,
        ...this.gltf.accessors[primitive.attributes[name]]
      }));
      primitive.indices = { ...this.gltf.accessors[primitive.indices] };
    });
    return primitives;
  }
}

export default GltfParser;
