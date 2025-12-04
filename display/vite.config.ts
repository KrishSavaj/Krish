import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  server: { port: 5174 },
  resolve: {
    alias: {
      // -> pcbdev/t2dutils (symlink) -> GUI/t2dutils/dist
    //   "t2dutils/GUI": path.resolve(__dirname, "../t2dutils/GUI/t2dutils/dist")
      // If you want to develop against sources instead of dist, temporarily use:
      "t2dutils/GUI": path.resolve(__dirname, "../t2dutils/GUI/t2dutils/src"),
    }
  }
});
