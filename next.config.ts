import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "files.catbox.moe" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
      { protocol: "https", hostname: "assistants.ae" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.google.com" },
    ],
  },
};

export default nextConfig;
