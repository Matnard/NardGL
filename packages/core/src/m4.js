import { vec3, mat4, quat } from "gl-matrix";

function reduceArgsWithFn(fn, input) {
  return function() {
    return [...arguments].reduce((a, b) => {
      return fn(a, b);
    }, input);
  };
}

function translation(x, y, z) {
  return mat4.fromTranslation(mat4.create(), vec3.fromValues(x, y, z));
}

function rotationX(rad) {
  return mat4.fromXRotation(mat4.create(), rad);
}

function rotationY(rad) {
  return mat4.fromYRotation(mat4.create(), rad);
}
function rotationZ(rad) {
  return mat4.fromZRotation(mat4.create(), rad);
}

function scaling(x, y, z) {
  return mat4.fromScaling(mat4.create(), vec3.fromValues(x, y, z));
}

function identity() {
  return mat4.create();
}

function projection(width, height, depth) {
  return mat4.perspective(mat4.create(), 45, width / height, 0.1, depth);
}

function multiply(a, b) {
  return mat4.multiply(mat4.create(), a, b);
}

function transpose(a) {
  return mat4.transpose(a, a);
}

const multiplyAll = reduceArgsWithFn(multiply, mat4.create());

const m4 = {
  projection,
  translation,
  scaling,
  multiply,
  multiplyAll,
  identity,
  transpose,

  invert: function(m) {
    return mat4.invert(mat4.create(), m);
  },

  translate: function(m, tx, ty, tz) {
    return m4.multiply(m, m4.translation(tx, ty, tz));
  },

  rotateX: function(m, angleInRadians) {
    return m4.multiply(m, rotationX(angleInRadians));
  },

  rotateY: function(m, angleInRadians) {
    return m4.multiply(m, rotationY(angleInRadians));
  },

  rotateZ: function(m, angleInRadians) {
    return m4.multiply(m, rotationZ(angleInRadians));
  },

  scale: function(m, sx, sy, sz) {
    return m4.multiply(m, m4.scaling(sx, sy, sz));
  },
  targetTo: function(conf) {
    const center = vec3.fromValues(...Object.values(conf.center));
    const eye = vec3.fromValues(...Object.values(conf.eye));
    const up = vec3.fromValues(0, 1, 0);
    return mat4.targetTo(mat4.create(), eye, center, up);
  },
  fromQuat: function(x, y, z, w) {
    const q = quat.fromValues(x, y, z, w);
    return mat4.fromQuat(mat4.create(), q);
  },
  EPSILON: 0.000001
};

export { m4 };
