import WebglRenderer from "./webglRenderer";
import Particles from "./geometries/Particles";
import Grid from "./geometries/Grid";
import Quad from "./geometries/Quad";
import NardLoader from "nardloader";
import assets from "../preload/*.*";
import PrincipledCube from "./geometries/PrincipledCube";
import GltfParser from "./core/gltf-parser";
// import profile512Path from "../preload/profile-512.png";

const urls = Object.values(assets)
  .map(Object.values)
  .flat();

//const urls = [principledPath, profile512Path, quadPath];
// const assetsPath = profile512Path.split("profile-512.png")[0];
// const urls = [
//   {
//     url: `${assetsPath}principled.gltf`,
//     mimeType: "model/gltf+json"
//   },
//   `${assetsPath}profile-512.png`,//
//   {
//     url: `${assetsPath}quad.gltf`,
//     mimeType: "model/gltf+json"
//   }
// ];

class App extends WebglRenderer {
  init() {
    this.particles = new Particles(this.gl);
    this.scene.push(this.particles);

    this.grid = new Grid(this.gl);
    this.scene.push(this.grid);

    this.quad = new Quad(
      this.gl,
      new GltfParser(App.data[2]).getPrimitives()[0]
    );
    this.scene.push(this.quad);

    this.cube = new PrincipledCube(
      this.gl,
      new GltfParser(App.data[0]).getPrimitives()[0]
    );
    this.scene.push(this.cube);

    this.cube.translation.z = 2;

    this.camera.translation.z = 4;
    this.camera.translation.y = 0.5;
    this.camera.rotation.x = Math.PI / 2;
    this.render();
  }

  beforeDraw(dt) {
    this.cube.rotation.z -= 0.005;
    this.cube.rotation.x += 0.005;
    this.quad.rotation.y += 0.005;
    this.camera.rotation.y -= 0.005;
  }
}
//console.log(urls);
new NardLoader({
  onProgress: function(progress) {
    console.log(`Progress: ${progress}`);
  },
  assets: urls
})
  .start()
  .then(function(data) {
    App.data = data;
    new App(); //document.getElementById("c"));
  });