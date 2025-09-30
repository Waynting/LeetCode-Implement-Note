import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProduction ? '/LeetCode-Implement-Note' : '',
  assetPrefix: isProduction ? '/LeetCode-Implement-Note' : '',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
