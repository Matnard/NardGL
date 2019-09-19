import { Transform } from "../Transform";
import { createProgramFromSource } from "../utils";
import { Attribute } from "../Attribute";
import { Uniform } from "../Uniform";
import { TextureUniform } from "../TextureUniform";
import { m4 } from "../m4";

class Primitive extends Transform {
  constructor(conf, geometry, material) {
    super();
    if (!conf) {
      console.log(geometry);

      const conf = {
        count: geometry.count
      };
      return;
    }
    //stuff to access
    this.vao = null;
    this.hasRenderedOnce = false;
    this.needsUpdate = true;

    //geometry holds the vertices and indices

    //material tells what to draw (points, lines, triangles)
    this.material = conf.material;
    this.indices = conf.indices || null;

    //draw stuff should come from the material
    this.draw = conf.draw || {
      primitiveType: 4,
      offset: 0,
      count: 3
    };
    this.draw.count = conf.count;
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
  }

  beforeDraw(dt) {}

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
    return attributesData.map(a => new Attribute(a));
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
      }
    ];

    uniformsData = [...uniformsData, ...extraUniforms];

    let uniforms = uniformsData.map(u => new Uniform(u));
    return [...uniforms, ...texturesData.map(t => new TextureUniform(t))];
  }

  init(gl) {
    this.attributes = this.initAttributes(this.material.attributesData);
    this.uniforms = this.initUniforms(this.material.uniformsData);

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
