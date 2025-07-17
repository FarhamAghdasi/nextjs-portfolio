const withOptimizedImages = require('next-optimized-images');

const nextConfig = withOptimizedImages({
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,

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
  },
  
  optimizeImagesInDev: false,
});
module.exports = nextConfig;
