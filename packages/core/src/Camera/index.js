import { Transform } from "../Transform";
import { m4 } from "../m4";

class Camera extends Transform {
  yLookAt = 1;
  get viewMatrix() {
    const target = {
      x: m4.EPSILON,
      y: this.yLookAt,
      z: m4.EPSILON
    };
    this.matrix = this.computeTargetToMatrix(...Object.values(target));
    //this.computeMatrix();
    return m4.invert(this.matrix);
  }
}

export { Camera };
