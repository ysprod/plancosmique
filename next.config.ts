import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.genspark.ai",
        port: "",
        pathname: "/api/files/**",
      },
    ],
  },
};

export default nextConfig;
