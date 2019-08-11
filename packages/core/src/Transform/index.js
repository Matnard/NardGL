import m4 from "../m4";

class Transform {
  constructor() {
    this.matrix = m4.identity();

    this.translation = {
      x: 0,
      y: 0,
      z: 0
    };

    this.rotation = {
      x: 0,
      y: 0,
      z: 0
    };

    this.scale = {
      x: 1,
      y: 1,
      z: 1
    };
  }

  computeMatrix(m = m4.identity()) {
    let transforms = m4.identity();
    transforms = m4.translate(
      transforms,
      this.translation.x,
      this.translation.y,
      this.translation.z
    );
    transforms = m4.rotateX(transforms, this.rotation.x);
    transforms = m4.rotateY(transforms, this.rotation.y);
    transforms = m4.rotateZ(transforms, this.rotation.z);

    transforms = m4.scale(transforms, this.scale.x, this.scale.y, this.scale.z);

    this.matrix = m4.multiply(m, transforms);
  }
}

class CameraTransform extends Transform {
  computeMatrix(m = m4.identity()) {
    let transforms = m4.identity();

    transforms = m4.scale(transforms, this.scale.x, this.scale.y, this.scale.z);

    transforms = m4.rotateX(transforms, this.rotation.x);
    transforms = m4.rotateY(transforms, this.rotation.y);
    transforms = m4.rotateZ(transforms, this.rotation.z);

    transforms = m4.translate(
      transforms,
      this.translation.x,
      this.translation.y,
      this.translation.z
    );
    this.matrix = m4.multiply(m, transforms);
  }
}

export { Transform, CameraTransform };
