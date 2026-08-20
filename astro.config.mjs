import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://praxonne.github.io",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  vite: {
    build: {
      sourcemap: false,
    },
  },
});
