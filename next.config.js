/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // Enable static export for GitHub Pages compatibility
  output: process.env.EXPORT_MODE === 'true' ? 'export' : undefined,
  trailingSlash: true,
  basePath: process.env.EXPORT_MODE === 'true' ? '/dosasnniversario' : '',
};

module.exports = nextConfig;
