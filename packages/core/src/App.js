import { Loader } from "@nardgl/loader";

class App {
  constructor(fps = 60) {
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();
    this.onEnterFrame = this.onEnterFrame.bind(this);
  }

  load(assets) {
    return new Loader({
      onProgress: function(progress) {
        console.log(`Progress: ${progress}`);
      },
      assets
    }).start();
    //.then(() => this);
  }

  onEnterFrame(fn) {
    const now = Date.now();
    const elapsed = now - this.then;
    if (elapsed > this.fpsInterval) {
      this.then = now - (elapsed % this.fpsInterval);
      fn();
    }
    requestAnimationFrame(() => {
      this.onEnterFrame(fn);
    });
  }
}

export { App };
