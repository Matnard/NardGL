import m4 from "../m4";
export default class Transform {
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

  computeMatrix(viewProjectionMatrix = m4.identity()) {
    this.matrix = viewProjectionMatrix;

    this.matrix = m4.translate(
      this.matrix,
      this.translation.x,
      this.translation.y,
      this.translation.z
    );
    this.matrix = m4.rotateX(this.matrix, this.rotation.x);
    this.matrix = m4.rotateY(this.matrix, this.rotation.y);
    this.matrix = m4.rotateZ(this.matrix, this.rotation.z);

    this.matrix = m4.scale(
      this.matrix,
      this.scale.x,
      this.scale.y,
      this.scale.z
    );
  }
}
