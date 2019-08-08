const batchLoad = function(promises, onProgress) {
  const count = promises.length;
  let resolved = 0;
  promises.forEach(p => {
    p.then(function() {
      resolved++;
      onProgress(resolved / count);
    });
  });

  return Promise.all(promises);
};

const loadImage = function(arg) {
  if (typeof arg === "string") {
    arg = {
      url: arg
    };
  }

  const { url, mimeType } = arg;

  return fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const type = mimeType || blob.type;

      const thenFn = {
        "image/png": blobToImg,
        "model/gltf+json": blobToJson,
        "text/html": blobToText
      }[type];

      return thenFn(blob);
    });
};

const blobToText = blob => {
  return new Promise(function(resolve, reject) {
    const fr = new FileReader();
    fr.onload = function() {
      resolve(this.result);
    };
    fr.onerror = function(err) {
      reject(err);
    };
    fr.readAsText(blob);
  });
};

const blobToJson = blob => {
  return new Promise(function(resolve, reject) {
    const fr = new FileReader();
    fr.onload = function() {
      resolve(JSON.parse(this.result));
    };
    fr.onerror = function(err) {
      reject(err);
    };
    fr.readAsText(blob);
  });
};

const blobToImg = blob => {
  var url = URL.createObjectURL(blob);
  var img = new Image();
  img.src = url;
  return img;
};

class NardLoader {
  constructor(conf) {
    this.onProgress = conf.onProgress;
    this.loaders = conf.assets.map(x => loadImage(x)) || [];
    this.waitingScreen = document.createElement("div");
    this.waitingScreen.style.backgroundColor = "rgba(0,0,0,1)";
    this.waitingScreen.style.width = "100%";
    this.waitingScreen.style.height = "100vh";
    this.waitingScreen.style.position = "fixed";
    this.waitingScreen.style.zIndex = "1000";
    this.waitingScreen.style.display = "flex";
    this.waitingScreen.style.justifyContent = "center";
    this.waitingScreen.style.alignItems = "center";

    this.logo = document.createElement("img");
    this.logo.style.width = "50px";
    this.logo.src =
      "data:image/png;base64,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PSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIgogICAgeG1sbnM6R0lNUD0iaHR0cDovL3d3dy5naW1wLm9yZy94bXAvIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZDMTc3NEMzQzhDRTExRTQ5ODczQ0VCMjA2RTcyNzYxIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdiY2RmM2IxLWQzY2QtNDc1ZC05MDkyLWU5ZjFiODMyMDMzYSIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjY4RkYxMjIyM0UyMDY4MTE4QzE0REZBQzc0Q0JENjlGIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJMaW51eCIKICAgR0lNUDpUaW1lU3RhbXA9IjE1NjUxNzkzOTAyNTc1NDciCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4xMiIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIj4KICAgPGlwdGNFeHQ6TG9jYXRpb25DcmVhdGVkPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6TG9jYXRpb25DcmVhdGVkPgogICA8aXB0Y0V4dDpMb2NhdGlvblNob3duPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6TG9jYXRpb25TaG93bj4KICAgPGlwdGNFeHQ6QXJ0d29ya09yT2JqZWN0PgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8aXB0Y0V4dDpSZWdpc3RyeUlkPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6UmVnaXN0cnlJZD4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjgxMWViZDEtYjQ2ZS00NzAyLTgyNzctYzBlOTQ4YzYwMTNmIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKExpbnV4KSIKICAgICAgc3RFdnQ6d2hlbj0iKzEwOjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICAgPHhtcE1NOkRlcml2ZWRGcm9tCiAgICBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY4RkYxMjIyM0UyMDY4MTE4QzE0REZBQzc0Q0JENjlGIgogICAgc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2OEZGMTIyMjNFMjA2ODExOEMxNERGQUM3NENCRDY5RiIvPgogICA8cGx1czpJbWFnZVN1cHBsaWVyPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VTdXBwbGllcj4KICAgPHBsdXM6SW1hZ2VDcmVhdG9yPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VDcmVhdG9yPgogICA8cGx1czpDb3B5cmlnaHRPd25lcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkNvcHlyaWdodE93bmVyPgogICA8cGx1czpMaWNlbnNvcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkxpY2Vuc29yPgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+Msy1agAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+MIBwwDCjNB800AAAFRSURBVFjD7di/DsFgEADwVgwGsVk6GSSMohqDF7ATHoE3YGDiITwCwmA2G6RlNhgkGks3MdhqKDfcxafVqm+4m5qrSpNf7k8/1XVdRcpIKLKGvG+WDPl8r66hTDmXQZn25MCasYQaqDb92OWzaZQ5OrcvfFnzR5qASO0oIthRVuorYGXNaDVDIoZkZc3456aATIDIc1NOzZBkrCmD5v50/ciqjyyU2Q0r6NaxW2TNf2kCYsvQAsxmVfUurIGOMtNOgTUj1FwtF+/uCZYfPj2Qc6d1zieU2mxN7+K+HkRSm36WKN5po+20AkRarXPzgjIwN2EmwpTk2pR8C6KIglWHxuy1/PDpQfya0GDpJBV8b3Jt/lGzVjWeLVcZo5YLiPTDBAYoPYzl0wPJOy2tTbvU9y5S5Mf2+/9pN5qo5bLmjzRpkfoJeEoQsGjRoIXMmsHjAf8YfEE8Xv1XAAAAAElFTkSuQmCC";
    this.waitingScreen.appendChild(this.logo);

    document.body.appendChild(this.waitingScreen);
  }

  add(asset) {
    this.loaders.push(loadImage(asset));
    return this;
  }

  addArray(assetUrls) {
    this.loaders = this.loaders.concat(assetUrls.map(x => loadImage(x)));
    return this;
  }

  start() {
    return batchLoad(this.loaders, progress => {
      this.waitingScreen.style.backgroundColor = `rgba(0,0,0,${1 - progress})`;
      this.onProgress(progress);
    }).then(data => {
      document.body.removeChild(this.waitingScreen);
      return data;
    });
  }
}

export { batchLoad, loadImage };
export default NardLoader;
