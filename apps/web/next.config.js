/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["@linked-all/ui"],
  },
  transpilePackages: ["@linked-all/ui", "@linked-all/types", "@linked-all/config", "@linked-all/utils"],
};

module.exports = nextConfig;
