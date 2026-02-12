import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  reactCompiler: true,
  images: {
    domains: ['images.unsplash.com', 'img.freepik.com'],
  },
};

export default nextConfig;
