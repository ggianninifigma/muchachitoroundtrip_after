import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `FIGMA` is set in the Figma Code Layer runtime. Outside Figma the local dev
// experience is unchanged (port 5173, auto-open browser).
const isFigma = Boolean(process.env.FIGMA);

export default defineConfig({
  plugins: [react()],
  server: {
    port: isFigma ? Number(process.env.PORT) : 5173,
    host: isFigma ? process.env.FIGMA_DEV_SERVER_HOST || "0.0.0.0" : undefined,
    strictPort: isFigma,
    open: isFigma ? false : true,
  },
});
