import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://static.draft5.gg/**')]
  },
};

export default nextConfig;
