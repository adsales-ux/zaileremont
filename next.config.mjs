/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "",
  assetPrefix: "",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
