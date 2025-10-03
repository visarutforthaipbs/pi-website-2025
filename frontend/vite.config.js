import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "https://pi-website-backend.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "chakra-vendor": [
            "@chakra-ui/react",
            "@emotion/react",
            "@emotion/styled",
          ],
          "router-vendor": ["react-router-dom"],
          "icons-vendor": ["react-icons", "@chakra-ui/icons"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
