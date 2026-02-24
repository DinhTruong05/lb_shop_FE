import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8081, // hoặc 3000 tùy bạn
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        // KHÔNG rewrite
      },
    },
  },
});