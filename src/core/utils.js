const createShader = function(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
};

const createProgram = function(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfolog(program));
  gl.deleteProgram(program);
};

const createProgramFromSource = function(
  gl,
  vertexShaderSrc,
  fragmentShaderSrc
) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSrc
  );

  return createProgram(gl, vertexShader, fragmentShader);
};

const resizeCanvas = function(canvas) {
  // Lookup the size the browser is displaying the canvas.
  var displayWidth = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    // Make the canvas the same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
};

const randomInt = function(range) {
  return Math.floor(Math.random() * range);
};

const getSize = function(type) {
  return {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16
  }[type];
};

const getGLSLType = function(componentType, type) {
  const size = getSize(type);
  return {
    5126: function(size) {
      return {
        1: "float",
        2: "vec2",
        3: "vec3",
        4: "vec4"
      }[size];
    },
    5123: function(size) {
      return {
        1: "int",
        2: "ivec2",
        3: "ivec3",
        4: "ivec4"
      }[size];
    }
  }[componentType](size);
};

const getTypedArray = function(srcData, componentType) {
  return new {
    5126: Float32Array,
    5123: Uint16Array
  }[componentType](srcData);
};

export {
  randomInt,
  resizeCanvas,
  createProgram,
  createShader,
  createProgramFromSource,
  getSize,
  getTypedArray,
  getGLSLType
};
