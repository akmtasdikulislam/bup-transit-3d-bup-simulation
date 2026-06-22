import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/bup-transit-3d-bup-simulation/",
  plugins: [react(), tailwindcss()],
});
