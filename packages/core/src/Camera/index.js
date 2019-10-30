import { Transform } from "../Transform";
import { m4 } from "../m4";

class Camera extends Transform {
  get viewMatrix() {
    const target = {
      x: m4.EPSILON,
      y: 1,
      z: m4.EPSILON
    };
    this.matrix = this.computeTargetToMatrix(...Object.values(target));
    //this.computeMatrix();
    return m4.invert(this.matrix);
  }
}

export { Camera };
