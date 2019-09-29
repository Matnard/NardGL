import {
  getSize,
  getTypedArray,
  getGLSLType,
  getBytesPerElementOfType
} from "./utils";

class AttributeCollection {
  constructor(conf) {
    if (conf.count) {
      delete conf.count;
    }
    for (var key in conf) {
      this[key] = conf[key];
    }
  }

  bind(gl, program) {
    this.gl = gl;
    this.program = program;
    return this;
  }

  toGLSL() {
    return `in ${getGLSLType(this.componentType, this.type)} ${this.name};\n`;
  }

  get location() {
    const location = this.gl.getAttribLocation(this.program, this.name);
    if (location === -1) {
      throw new Error(
        `Maybe not used in shader. Haven't fount the location of the variable name "${this.name}"`
      );
    }
    return location;
  }

  get size() {
    return getSize(this.type);
  }

  get count() {
    return this.srcData ? this.srcData.length / this.size : null;
  }

  get array() {
    return getTypedArray(this.srcData, this.componentType);
  }
}

class CustomAttribute {
  constructor(name, type, componentType, ...data) {
    this._name = name;
    this._type = type;
    this._componentType = componentType;
    this._data = [...data];
    this.elementsPerAttribute = null;
  }

  get name() {
    return !this._name ? this.constructor.label : this._name;
  }

  get type() {
    return !this._type ? this.constructor.type : this._type;
  }

  get componentType() {
    return !this._componentType
      ? this.constructor.componentType
      : this._componentType;
  }

  get data() {
    return this._data;
  }

  get spaceTaken() {
    return this.data.length * getBytesPerElementOfType(this.componentType);
  }
}

class NardAttribute extends CustomAttribute {
  constructor(...data) {
    super(null, null, null, ...data);
  }
}

class PositionAttribute extends NardAttribute {
  static label = "POSITION";
  static type = "VEC3";
  static componentType = 5126;
}

class UvAttribute extends NardAttribute {
  static label = "UV";
  static type = "VEC2";
  static componentType = 5126;
}

class NormalAttribute extends NardAttribute {
  static label = "NORMAL";
  static type = "VEC3";
  static componentType = 5126;
}

export {
  AttributeCollection,
  PositionAttribute,
  UvAttribute,
  NormalAttribute,
  CustomAttribute
};
