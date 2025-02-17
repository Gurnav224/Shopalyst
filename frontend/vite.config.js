import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import process from "node:process";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());


  return {
    server: {
      proxy: {
        "/api": env?.VITE_API_URL_VERCEL,
      },
    },
    plugins: [react()],
  };
});
