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
    VEC2: 2,
    VEC3: 3,
    VEC4: 4
  }[type];
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
  getTypedArray
};
