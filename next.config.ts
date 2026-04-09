import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["imgbb.com", "i.ibb.co"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://sustainable-server.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
