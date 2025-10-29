import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Proxy API requests to backend
      "/api": {
        target: "https://pi-website-backend.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      // Proxy backend image proxy requests (for when backend returns full URLs)
      "^/https://pi-website-backend.onrender.com/.*": {
        target: "https://pi-website-backend.onrender.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/https:\/\/pi-website-backend\.onrender\.com/, ""),
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
