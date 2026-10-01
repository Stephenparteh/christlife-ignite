import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import seoPlugin from "./vite-plugin-seo";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Forwards dev API calls to the Express server (see server/) so the
      // browser sees them as same-origin — no CORS setup needed locally,
      // and the auth cookie just works. Override the target if the API
      // dev server runs on a different port.
      "/api": {
        target: process.env.VITE_API_PROXY_TARGET || "http://localhost:4000",
        changeOrigin: true,
      },
      // The local-disk media upload fallback (server/src/services/uploadService.ts,
      // dev-only — production requires Cloudinary) returns site-relative
      // URLs like "/uploads/team/xxx.jpeg", the same convention as the
      // static assets this dev server already serves from public/. Without
      // this rule, the browser resolves that path against ITSELF (this
      // dev server) instead of the API that actually wrote the file, and
      // gets the SPA's index.html back instead of the image — the exact
      // same target as /api, so dev stays in sync automatically.
      "/uploads": {
        target: process.env.VITE_API_PROXY_TARGET || "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    seoPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
