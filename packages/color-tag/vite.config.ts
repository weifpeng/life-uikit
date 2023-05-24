import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "index.ts",
      name: "ColorTag",
      fileName: (format) => `color-tag.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "@life-uikit/context"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  plugins: [
    react(),
    dts({
    }),
    svgr({ exportAsDefault: true }),
  ],
  resolve: {},
});
