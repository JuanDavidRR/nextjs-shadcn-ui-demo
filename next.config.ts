import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    workerThreads: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bics.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "bicscomstg.wpenginepowered.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
