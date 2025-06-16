import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'farhamaghdasi.ir',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
