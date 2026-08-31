import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    qualities: [70, 75, 80],
  },
};

export default nextConfig;
