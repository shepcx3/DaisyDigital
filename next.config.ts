import type { NextConfig } from "next";

// GitHub Pages serves this repo from /DaisyDigital. The deploy workflow sets
// PAGES_BASE_PATH; locally it's empty so the dev server runs at "/".
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  turbopack: {
    rules: {
      // only the global stylesheet goes through Tailwind; *.module.css stays a CSS module
      "globals.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
