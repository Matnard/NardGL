import { CameraTransform as Transform } from "../Transform";
import m4 from "../m4";

export default class Camera {
  constructor() {
    this.transform = new Transform();
  }

  get matrix() {
    return this.transform.matrix;
  }

  get translation() {
    return this.transform.translation;
  }

  get rotation() {
    return this.transform.rotation;
  }

  get scale() {
    return this.transform.scale;
  }

  get viewMatrix() {
    this.computeMatrix();
    return m4.invert(this.transform.matrix);
  }

  computeMatrix() {
    this.transform.computeMatrix();
  }
}
