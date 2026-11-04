import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/modalidad",
        destination: "/contacto",
        permanent: true,
      },
    ];
  },
  images: {
    qualities: [75, 90],
  },
  cacheComponents: true,
  partialPrefetching: true,
  outputFileTracingIncludes: {
    "/contacto": ["./app/icon.png"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
