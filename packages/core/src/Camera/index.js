import { Transform } from "../Transform";
import { m4 } from "../m4";

class Camera extends Transform {
  get viewMatrix() {
    this.computeMatrix();
    return m4.invert(this.matrix);
  }
}

export { Camera };
