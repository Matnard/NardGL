import { Transform } from "../Transform";
import { m4 } from "../m4";

class Camera extends Transform {
  get viewMatrix() {
    const target = {
      x: 0,
      y: 0,
      z: 0
    };
    this.matrix = this.computeTargetToMatrix(...Object.values(target));
    //this.computeMatrix();
    return m4.invert(this.matrix);
  }
}

export { Camera };
