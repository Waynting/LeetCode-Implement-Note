import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/LeetCode-Implement-Note',
  assetPrefix: '/LeetCode-Implement-Note',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
