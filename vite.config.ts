import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Minimal local declaration so the config type-checks without pulling in
// @types/node just for one env lookup.
declare const process: { env: Record<string, string | undefined> };

// On GitHub Pages a project site is served from /<repo>/, so production assets
// must be referenced under that sub-path. Dev stays at "/". Override with
// BASE_PATH (e.g. "/" for a custom domain) when needed.
const repoBase = "/Hart-Portfolio-v2/";

export default defineConfig(({ command }) => ({
  base: process.env.BASE_PATH ?? (command === "build" ? repoBase : "/"),
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
}));
