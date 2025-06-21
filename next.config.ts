/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['farhamaghdasi.ir'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'farhamaghdasi.ir',
        pathname: '/assets/img/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 's8.uupload.ir',
        pathname: '/files/**',
      },
    ],
  },
};

module.exports = nextConfig;