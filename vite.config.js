import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
  },
  worker: {
    format: "es", // enable code-splitting
  },
});
