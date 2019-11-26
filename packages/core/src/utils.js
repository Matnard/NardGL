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

  console.log(gl.getProgramInfoLog(program));
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
  var cssToRealPixels = window.devicePixelRatio || 1;

  var displayWidth = Math.floor(canvas.clientWidth * cssToRealPixels);
  var displayHeight = Math.floor(canvas.clientHeight * cssToRealPixels);

  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
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

const getBytesPerElementOfType = function(componentType) {
  return {
    5126: Float32Array,
    5123: Uint16Array
  }[componentType].BYTES_PER_ELEMENT;
};

const hexToNormalizedRGB = function(number) {
  return {
    r: (number & (0xff0000 >> 16)) / 255,
    g: (number & (0x00ff00 >> 8)) / 255,
    b: (number & 0x0000ff) / 255
  };
};

const debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const getMatches = function(regex, text) {
  const matches = [];
  let match;
  do {
    match = regex.exec(text);
    if (match) {
      matches.push(match);
    }
  } while (match != null);

  return matches;
};

export {
  hexToNormalizedRGB,
  randomInt,
  resizeCanvas,
  createProgram,
  createShader,
  createProgramFromSource,
  getSize,
  getTypedArray,
  getGLSLType,
  getBytesPerElementOfType,
  debounce,
  getMatches
};
