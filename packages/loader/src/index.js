const batchLoad = function (promises, onProgress) {
  const count = promises.length;
  let resolved = 0;
  promises.forEach((p) => {
    p.then(function () {
      resolved++;
      onProgress(resolved / count);
    });
  });

  return Promise.all(promises);
};

const loadAsset = function (arg) {
  if (typeof arg === "string") {
    arg = {
      url: arg,
    };
  }

  const { url, mimeType } = arg;

  return fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const type = mimeType || blob.type;

      let thenFn = {
        "image/png": blobToImg,
        "image/jpeg": blobToImg,
        "model/gltf+json": blobToJson,
        "application/x-tgif": blobToText,
        "text/html": blobToText,
      }[type];

      if (!thenFn) {
        console.error("Unsupported type. Defaulted to text");
        thenFn = blobToText;
      }

      return thenFn(blob);
    })
    .then((result) => {
      const asset = {};
      asset[url] = result;
      return asset;
    });
};

const blobToText = (blob) => {
  return new Promise(function (resolve, reject) {
    const fr = new FileReader();
    fr.onload = function () {
      resolve(this.result);
    };
    fr.onerror = function (err) {
      reject(err);
    };
    fr.readAsText(blob);
  });
};

const blobToJson = (blob) => {
  return new Promise(function (resolve, reject) {
    const fr = new FileReader();
    fr.onload = function () {
      resolve(JSON.parse(this.result));
    };
    fr.onerror = function (err) {
      reject(err);
    };
    fr.readAsText(blob);
  });
};

const blobToImg = (blob) => {
  var url = URL.createObjectURL(blob);
  var img = new Image();
  img.src = url;
  return img;
};

class Loader {
  constructor(conf) {
    this.onProgress = conf.onProgress || function () {};
    this.onComplete = conf.onComplete || function () {};
    const assets = conf.assets || [];
    this.loaders = assets.map((x) => loadAsset(x)) || [];
  }

  add(asset) {
    this.loaders.push(loadAsset(asset));
    return this;
  }

  addArray(assetUrls) {
    this.loaders = this.loaders.concat(assetUrls.map((x) => loadAsset(x)));
    return this;
  }

  start() {
    return batchLoad(this.loaders, (progress) => {
      this.onProgress(progress);
    }).then((data) => {
      this.onComplete();
      return data.reduce((a, b) => {
        a[Object.keys(b)[0]] = b[Object.keys(b)[0]];
        return a;
      }, {});
    });
  }
}

class NardLoader extends Loader {
  constructor(conf) {
    super(conf);
    this.waitingScreen = document.createElement("div");
    this.waitingScreen.style.backgroundColor = "rgba(0,0,0,1)";
    this.waitingScreen.style.width = "100%";
    this.waitingScreen.style.height = "100vh";
    this.waitingScreen.style.position = "fixed";
    this.waitingScreen.style.top = 0;
    this.waitingScreen.style.left = 0;
    this.waitingScreen.style.zIndex = "1000";
    this.waitingScreen.style.display = "flex";
    this.waitingScreen.style.justifyContent = "center";
    this.waitingScreen.style.alignItems = "center";

    this.logo = document.createElement("img");
    this.logo.style.width = "50px";
    this.logo.src = "https://matnard.github.io/NardGL/images/profile-51.png";
    this.waitingScreen.appendChild(this.logo);

    document.body.appendChild(this.waitingScreen);

    this.onProgress = (progress) => {
      this.waitingScreen.style.backgroundColor = `rgba(0,0,0,${1 - progress})`;
    };

    this.onComplete = () => {
      document.body.removeChild(this.waitingScreen);
    };
  }
}

export { batchLoad, loadAsset, Loader, NardLoader };
