import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  output: "static",
  prefetch: {
    defaultStrategy: "viewport",
  },
  adapter: cloudflare(),
  integrations: [preact({ compat: true }), tailwind()],
  vite: {
    plugins: [visualizer()],
    ssr: {
      noExternal: ["@medusajs/js-sdk"],
    },
  },
  image: {
    remotePatterns: [{ protocol: "https" }, { protocol: "http" }],
  },
});
