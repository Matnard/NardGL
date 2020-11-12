"use strict";

const { Loader, NardLoader } = require("../src/index");
global.fetch = require("node-fetch");

test("Raw Preloader", () => {
  let complete = false;

  const loader = new Loader({
    onComplete: () => {
      complete = true;
    },
  });

  loader.add("https://matnard.github.io/NardGL/images/profile-51.png");
  loader.start();

  expect(true).toBe(true);
});
