import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: [
      "res.cloudinary.com",
      "cdn.weatherapi.com",
    ],
  },
};

export default nextConfig;
