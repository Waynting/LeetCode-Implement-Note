import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export configuration for Vercel deployment
  // This enables full Next.js features including SSR and API routes
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
