import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 3000, // 👈 change the port here
  // },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/common" as *;`,
      },
    },
  },
});
