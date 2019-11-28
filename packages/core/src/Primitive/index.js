import { Transform } from "../Transform";
import { createProgramFromSource } from "../utils";
import { AttributeCollection } from "../Attribute";
import { Uniform } from "../Uniform";
import { TextureUniform } from "../TextureUniform";
import { TextureCubeUniform } from "../TextureCubeUniform";
import { m4 } from "../m4";

class Primitive extends Transform {
  static projectionMatrix = m4.identity();
  static viewMatrix = m4.identity();
  static t = 0;
  static reverseLightDirection = [0, 0, 0];

  constructor(geometry, material) {
    super();
    //stuff to access
    this.vao = null;
    this.hasRenderedOnce = false;
    this.needsUpdate = true;

    this.material = material;
    this.geometry = geometry;
    this.indices = geometry.getIndicesData();

    this.draw = {
      primitiveType: material.primitiveType,
      offset: 0,
      count: geometry.getCount(material.primitiveType)
    };
  }

  setUniform(name, data) {
    this.uniforms.find(u => u.name === name).value = data;
  }

  updateUniform(name, value) {
    this.uniforms.find(u => u.name === name).update(value);
  }

  updateUniforms() {
    this.uniforms.forEach(uniform => {
      uniform.update();
    });

    this.uniforms
      .filter(uniform => uniform.constructor.name !== "Uniform")
      .forEach(uniform => {
        uniform.preSet();
      });
  }

  beforeDraw() {
    this.setUniform("u_projectionMatrix", Primitive.projectionMatrix);
    this.setUniform("u_viewMatrix", Primitive.viewMatrix);
    this.setUniform("u_modelMatrix", this.matrix);
    this.setUniform("u_time", Primitive.t);
    this.setUniform("u_reverseLightDirection", Primitive.reverseLightDirection);
    this.setUniform(
      "u_normalTransform",
      this.normalTransform(Primitive.viewMatrix)
    );
  }

  createProgram(gl) {
    return createProgramFromSource(
      gl,
      this.material.vertexShaderSrc(this.attributes, this.uniforms),
      this.material.fragmentShaderSrc(this.uniforms)
    );
  }

  bindUniforms(gl) {
    return this.uniforms
      .concat([])
      .map(uniform => uniform.bind(gl, this.program));
  }

  bindAttributes(gl) {
    return this.attributes
      .concat([])
      .map(attribute => attribute.bind(gl, this.program));
  }

  initAttributes(attributesData) {
    return attributesData.map(a => new AttributeCollection(a));
  }

  initUniforms(uniformsData, texturesData = []) {
    const extraUniforms = [
      {
        name: "u_modelMatrix",
        type: "Matrix4fv",
        value: m4.identity(),
        count: 1
      },
      {
        name: "u_viewMatrix",
        type: "Matrix4fv",
        value: m4.identity(),
        count: 1
      },
      {
        name: "u_projectionMatrix",
        type: "Matrix4fv",
        value: m4.identity(),
        count: 1
      },
      {
        name: "u_time",
        type: "1f",
        value: 0,
        count: 1
      },
      {
        name: "u_reverseLightDirection",
        type: "3fv",
        value: [5, 7, 10],
        count: 1
      },
      {
        name: "u_normalTransform",
        type: "Matrix4fv",
        value: m4.identity(),
        count: 1
      }
    ];

    uniformsData = [...uniformsData, ...extraUniforms];

    let uniforms = uniformsData.map(u => new Uniform(u));
    return [
      ...uniforms,
      ...texturesData.map(t => {
        // return new TextureUniform(t);
        return t.textureCube
          ? new TextureCubeUniform(t)
          : new TextureUniform(t);
      })
    ];
  }

  init(gl) {
    this.attributes = this.initAttributes(
      this.material.attributesData || this.geometry.getAttributeData()
    );
    this.uniforms = this.initUniforms(
      this.material.uniformsData,
      this.material.texturesData
    );
    this.program = this.createProgram(gl);
    this.uniforms = this.bindUniforms(gl);
    this.attributes = this.bindAttributes(gl);

    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    this.attributes.forEach(attribute => {
      if (!!attribute.srcData) {
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, attribute.array, gl.STATIC_DRAW);
      }

      const conf = {
        location: attribute.location,
        size: attribute.size,
        type: attribute.componentType,
        normalize: true,
        stride: attribute.stride,
        offset: attribute.offset
      };

      if (this.indices) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
        const elementsConf = {
          target: gl.ELEMENT_ARRAY_BUFFER,
          srcData: new Uint16Array(this.indices.srcData),
          usage: gl.STATIC_DRAW
        };
        gl.bufferData(
          elementsConf.target,
          elementsConf.srcData,
          elementsConf.usage
        );
      }

      gl.vertexAttribPointer(
        conf.location,
        conf.size,
        conf.type,
        conf.normalize,
        conf.stride,
        conf.offset
      );

      gl.enableVertexAttribArray(attribute.location);
    });

    this.needsUpdate = false;
  }
}

export { Primitive };
