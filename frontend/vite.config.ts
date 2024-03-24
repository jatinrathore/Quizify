import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Function to determine the base URL based on environment

export default defineConfig({
  plugins: [react()],
});
