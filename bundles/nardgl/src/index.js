import pkg from "../package.json";
import consoleGreet from "@nardgl/console-greeting";
consoleGreet("NardGL", pkg.version);
export * from "@nardgl/loader";
export * from "@nardgl/core";
export * from "@nardgl/gltf-parser";
export * from "@nardgl/obj-parser";
export * from "@nardgl/primitives";
