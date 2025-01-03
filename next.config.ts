import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com", // Allow this domain for external images
    ],
  },
};

export default nextConfig;
