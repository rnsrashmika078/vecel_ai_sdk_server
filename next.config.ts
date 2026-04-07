import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  devIndicators: false,
  logging: false,
  images: {
    domains: ["res.cloudinary.com", "cdn.weatherapi.com"],
  },
};

export default nextConfig;
