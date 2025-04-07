import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "logo.clearbit.com",
      "www.google.com", // se estiver usando favicons do Google
      "ui-avatars.com", // se usar avatar como fallback
    ],
  },
};

export default nextConfig;
