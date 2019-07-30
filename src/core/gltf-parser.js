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

    if (gltf.images) {
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

        image.src = this.uint8ToUrl(image.srcData, image.mimeType);
      });
    }

    if (gltf.materials) {
      gltf.materials.forEach(material => {
        const textureId = material.pbrMetallicRoughness.baseColorTexture.index;
        const texture = gltf.images[gltf.textures[textureId].source].src;
        const uvsAttributeName = `TEXTCOORD_${
          material.pbrMetallicRoughness.baseColorTexture.texCoord
        }`;
        material.pbrMetallicRoughness.baseColorTexture.texture = texture;
        material.pbrMetallicRoughness.baseColorTexture.uvsAttributeName = uvsAttributeName;
        console.log(material.pbrMetallicRoughness.baseColorTexture);
      });
    }

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

  //mesh > primitives > material.pbrMetallicRoughness.baseColorTexture > texture > images
  getPrimitives(meshId = 0) {
    //from mesh id
    const primitives = this.gltf.meshes[meshId].primitives;

    primitives.forEach(primitive => {
      primitive.attributes = Object.keys(primitive.attributes).map(name => ({
        name,
        ...this.gltf.accessors[primitive.attributes[name]]
      }));
      primitive.indices = { ...this.gltf.accessors[primitive.indices] };
      if (typeof primitive.material !== "undefined") {
        primitive.material = this.gltf.materials[primitive.material];
      }
    });
    return primitives;
  }

  uint8ToUrl(byteArray, type) {
    var data = new Uint8Array(byteArray);
    var blob = new Blob([data], { type });
    return URL.createObjectURL(blob);
  }
}

export default GltfParser;
