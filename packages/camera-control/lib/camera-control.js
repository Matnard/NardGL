function step(value, threshold) {
  const sign = Math.sign(value);
  value = Math.abs(value);

  const output = Math.max(value, threshold);

  console.log(output);

  return output > threshold ? output * sign : 0;
}

class CameraControl {
  constructor(camera, canvas) {
    this.camera = camera;
    this.rightPressed = false;
    this.leftPressed = false;
    this.downPressed = false;
    this.upPressed = false;

    this.deltaXSign = 0;
    this.deltaYSign = 0;

    canvas.addEventListener("wheel", this.onWheel.bind(this));
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  onWheel({ deltaX, deltaY }) {
    //console.log(deltaX, deltaY);
    this.deltaXSign = Math.sign(step(deltaX, 1));
    this.deltaYSign = Math.sign(step(deltaY, 1));
  }

  onKeyDown({ keyCode }) {
    if (keyCode == 39) {
      this.rightPressed = true;
    } else if (keyCode == 37) {
      this.leftPressed = true;
    }

    if (keyCode == 40) {
      this.downPressed = true;
    } else if (keyCode == 38) {
      this.upPressed = true;
    }
  }

  onKeyUp({ keyCode }) {
    if (keyCode == 39) {
      this.rightPressed = false;
    } else if (keyCode == 37) {
      this.leftPressed = false;
    }

    if (keyCode == 40) {
      this.downPressed = false;
    } else if (keyCode == 38) {
      this.upPressed = false;
    }
  }

  update() {
    if (this.rightPressed) {
      this.camera.translation.x += 5;
    } else if (this.leftPressed) {
      this.camera.translation.x -= 5;
    }
    if (this.downPressed) {
      this.camera.rotation.x += Math.PI / 30;
    } else if (this.upPressed) {
      this.camera.rotation.x -= Math.PI / 30;
    }

    if (this.deltaXSign > 0) {
      this.camera.rotation.y += Math.PI / 30;
    } else if (this.deltaXSign < 0) {
      this.camera.rotation.y -= Math.PI / 30;
    }

    if (this.deltaYSign > 0) {
      this.camera.translation.z += 5;
    } else if (this.deltaYSign < 0) {
      this.camera.translation.z -= 5;
    }
  }
}

export { CameraControl };
