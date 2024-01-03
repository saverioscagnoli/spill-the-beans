import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

export default defineConfig({
  plugins: [react(), mdx({ remarkPlugins: [remarkBreaks, remarkGfm] })]
});
