import { defineConfig } from "windicss/helpers";
export default defineConfig({
  extract: {
    // accepts globs and file paths relative to project root
    include: ["index.html", "./**/index.html"],
    exclude: ["node_modules/**/*", ".git/**/*"],
  },
});
