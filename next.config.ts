/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    domains: ['farhamaghdasi.ir'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'farhamaghdasi.ir',
        pathname: '/assets/imgs/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 's8.uupload.ir',
        pathname: '/files/**',
      },
    ],
    unoptimized: true,
    trailingSlash: false
  },
};

module.exports = nextConfig;
