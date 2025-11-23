import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  basePath: '/portfolio',
  assetPrefix: '/portfolio',
  images: {
    unoptimized: true, // Disable image optimization for standalone builds
  },
};

export default nextConfig;
