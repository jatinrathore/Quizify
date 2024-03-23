import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Function to determine the base URL based on environment

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  plugins: [react()],
});
