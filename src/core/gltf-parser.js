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
      const length = itemsPerType * accessor.count;

      accessor.srcData = this.unpackBufferViewData(
        gltf,
        length,
        elementBytesLength,
        typedGetter,
        accessor.bufferView
      );

      //console.log(accessor.data.map(d => d.toFixed(1)));
    });

    gltf.images.forEach(image => {
      const elementBytesLength = 1;
      const typedGetter = "getUint8";
      const length = gltf.bufferViews[image.bufferView].byteLength;

      image.srcData = this.unpackBufferViewData(
        gltf,
        length,
        elementBytesLength,
        typedGetter,
        image.bufferView
      );
      image.HTMLImageElement = this.uint8ToHTMLImageElement(
        image.srcData,
        image.mimeType
      );
    });

    console.log(gltf);
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

  unpackBufferViewData(
    gltf,
    length,
    elementBytesLength,
    typedGetter,
    bufferView
  ) {
    let bufferId = gltf.bufferViews[bufferView].buffer;
    let offset = gltf.bufferViews[bufferView].byteOffset;

    let dv = gltf.buffers[bufferId].data;
    return Array.from({
      length
    }).map((el, i) => {
      var loopOffset = offset + Math.max(0, elementBytesLength * i);
      return dv[typedGetter](loopOffset, true);
    });
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
    return {
      SCALAR: 1,
      VEC2: 2,
      VEC3: 3,
      VEC4: 4
    }[type];
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

  uint8ToHTMLImageElement(byteArray, type) {
    var data = new Uint8Array(byteArray);
    var blob = new Blob([data], { type });
    var url = URL.createObjectURL(blob);
    var img = new Image();
    img.src = url;
    //document.body.appendChild(img);
    return img;
  }
}

export default GltfParser;
