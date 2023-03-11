const { resolve } = require("path");
import { defineConfig } from "vite";

import toc from "./src/entrypoints.json";

let mpa = {};
for (url in toc) {
  mpa[url] = resolve(__dirname, "src/" + url + "/index.html");
}

export default defineConfig({
  // config options
  root: "./src",
  plugins: [],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        ...mpa,
      },
    },
  },
});
