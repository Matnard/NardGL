class CubeFacesSlicer {
  constructor(img, width, height, confs) {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    this.cubeFaces = confs.map(conf => {
      return conf.map(faceCoord => {
        const x = width * faceCoord.x;
        const y = height * faceCoord.y;
        ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
        return CubeFacesSlicer.cloneCanvas(ctx.canvas);
      });
    });
  }

  static cloneCanvas(oldCanvas) {
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.canvas.width = oldCanvas.width;
    ctx.canvas.height = oldCanvas.height;
    ctx.drawImage(oldCanvas, 0, 0);
    return ctx.canvas;
  }
}

export { CubeFacesSlicer };
