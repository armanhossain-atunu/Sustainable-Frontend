import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ["imgbb.com", "i.ibb.co.com", "example.com", "o1p6rxnc0f.tenbytecdn.com"],
    domains: ["imgbb.com", "i.ibb.co", "example.com", "o1p6rxnc0f.tenbytecdn.com", "i.ibb.co.com"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "https://sustainable-server.vercel.app/api/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
