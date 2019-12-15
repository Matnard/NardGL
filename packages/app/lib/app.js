import { Loader } from "@nardgl/loader";

class App {
  constructor(fps = 60) {
    this.assets = null;
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();
    this.tick = this.tick.bind(this);
    this.tickFns = [];
  }

  setAssets(assets) {
    this.assets = assets;
    return this;
  }

  start(assets, fn) {
    new Loader({
      onProgress: function(progress) {
        console.log(`Progress: ${(progress * 100).toFixed(2)}%`);
      },
      assets
    })
      .start()
      .then(data => {
        fn(data);
        this.tick();
        return data;
      });
    return this;
  }

  onEnterFrame(fn) {
    this.tickFns = [fn];
    return this;
  }

  onResize(onResize) {
    onResize();
    window.addEventListener("resize", debounce(onResize, 150));
    return this;
  }

  tick() {
    const now = Date.now();
    const elapsed = now - this.then;
    if (elapsed > this.fpsInterval) {
      this.then = now - (elapsed % this.fpsInterval);
      this.tickFns.forEach(fn => fn(elapsed));
    }
    requestAnimationFrame(() => {
      this.tick();
    });

    return this;
  }
}

export { App };

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
