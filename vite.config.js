const { resolve } = require("path");
import { defineConfig } from "vite";

import toc from "./src/toc.json";

const mpa = toc.reduce((acc, item) => {
  const entry = {
    [item.url]: resolve(__dirname, "src/" + item.url + "/index.html"),
  };
  return { ...acc, ...entry };
}, {});

export default defineConfig({
  // config options
  root: "./src",
  plugins: [],
  logLevel: "warn",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        ...mpa,
      },
    },
  },
});
