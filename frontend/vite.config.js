import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import process from "node:process";
import { fileURLToPath } from "node:url"
import { dirname , resolve} from "node:path";


const __dirname = dirname(fileURLToPath(import.meta.url));



// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(),'');

  return {
    server: {
      port: env.VITE_PORT || 3000,
      open: true,
      proxy: mode === 'development' ? {
        "/api": {
          target: env.VITE_API_URL_VERCEL || "http://localhost:3000",
          changeOrigin: true,
        },
      }: undefined,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },

    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: mode === "development",
      target:"esnext",
      minify:"esbuild",
      rollupOptions:{
        input:{
          main:resolve(__dirname,'index.html')
        },
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
        },
      }
    },
    base:'/'
  };
});
