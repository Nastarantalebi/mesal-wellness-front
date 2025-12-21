import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 3.6 * 1024 * 1024,
      },
      manifest: {
        name: "مجموعه ماساژ آسمان",
        short_name: "ماساژ آسمان",
        description: "یک اپلیکشن برای ماساژ",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/logo-192×192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo-192×192.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/logo-192×192.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
