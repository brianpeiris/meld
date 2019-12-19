import resolve from "rollup-plugin-node-resolve";
import legacy from "rollup-plugin-legacy";
import typescript from "rollup-plugin-typescript2";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

export default {
  input: "./src/index.ts",
  output: {
    file: "bundle.js",
    format: "iife"
  },
  plugins: [
    resolve(),
    legacy({
      "node_modules/three/examples/js/vr/WebVR.js": "WEBVR"
    }),
    typescript(),
    serve(),
    livereload()
  ]
};
