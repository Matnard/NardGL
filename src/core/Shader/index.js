import { getGLSLType } from "../utils";

const defaultScript = `//uniform mat4 u_matrix;
out lowp vec4 color;	//Color to send to fragment shader.

void main(void){
	
	gl_Position = a_position;
  // gl_Position = u_matrix * a_position;
	color = vec4(u_colors[ int(a_colors) ], 1.0); //Using the 4th float as a color index.
	
}
`;

class Shader {
  constructor(conf) {
    this.attributes = conf.attributes;
    this.uniforms = conf.uniforms;
    this.script = conf.script || defaultScript;
  }

  outputAttribute({ type, name, componentType }) {
    return `in ${getGLSLType(componentType, type)} ${name};\n`;
  }

  outputUniform({ type, name, count }) {
    const getType = type =>
      ({
        "1f": "float",
        "1fv": "float",
        "2f": "vec2",
        "2fv": "vec2",
        "3f": "vec3",
        "3fv": "vec3",
        "4f": "vec4",
        "4fv": "vec4",
        Matrix2fv: "mat2",
        Matrix3fv: "mat3",
        Matrix4fv: "mat4",
        "1i": "int",
        "1iv": "int",
        "2i": "ivec2",
        "2iv": "ivec2",
        "3i": "ivec3",
        "3iv": "ivec3",
        "4i": "ivec4",
        "4iv": "ivec4",
        "1u": "uint",
        "1uv": "uint",
        "2u": "uvec2",
        "2uv": "uvec2",
        "3u": "uvec3",
        "3uv": "uvec3",
        "4u": "uvec4",
        "4uv": "uvec4"
      }[type]);

    return `uniform ${getType(type)} ${name}${
      count > 2 ? `[${count}];\n` : `;\n`
    }`;
  }

  get stringAttributes() {
    return this.attributes.map(this.outputAttribute).join("");
  }

  get decorated() {
    throw new Error("Use either VertexShader or FragmentShader instances");
  }
}

export default Shader;

class VertexShader extends Shader {
  get decorated() {
    return (
      "#version 300 es\n" +
      "precision mediump float;\n" +
      this.attributes.map(this.outputAttribute).join("") +
      "\n" +
      this.uniforms.map(this.outputUniform).join("") +
      "\n" +
      `${this.script}`
    );
  }
}

class FragmentShader extends Shader {
  get decorated() {
    return (
      "#version 300 es\n" +
      "precision mediump float;\n" +
      this.uniforms.map(this.outputUniform).join("") +
      "\n" +
      `${this.script}`
    );
  }
}

export { VertexShader, FragmentShader };
