import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "is.gd",
        protocol: "https",
      },
    ],
  },
};

// Merge MDX config with Next.js config
export default nextConfig;
