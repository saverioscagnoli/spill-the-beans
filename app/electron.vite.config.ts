import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import { createRequire } from "module";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin({ exclude: ["file-type"] })],
    build: {
      minify: true,
      rollupOptions: {
        external: ["test/*"]
      }
    }
  },

  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": path.resolve("src/renderer/src")
      }
    },
    plugins: [react(), reactVirtualized()]
  }
});

export function reactVirtualized(): Plugin {
  return {
    name: "flat:react-virtualized",
    configResolved() {
      const require = createRequire(import.meta.url);
      const file = require
        .resolve("react-virtualized")
        .replace(
          path.join("dist", "commonjs", "index.js"),
          path.join("dist", "es", "WindowScroller", "utils", "onScroll.js")
        );

      const code = fs.readFileSync(file, "utf-8");
      const patched = code.replace(
        'import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";',
        ""
      );

      fs.writeFileSync(file, patched);
    }
  };
}
