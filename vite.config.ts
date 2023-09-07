import { fileURLToPath, URL } from "node:url";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/action": "http://106.12.116.25",
    },
    // origin: "http://106.12.116.25",
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "@primary-color": "#009ceb",
          "@border-radius-base": "4px",
        },
      },
    },
  },
});
