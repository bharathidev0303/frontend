/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "/",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
