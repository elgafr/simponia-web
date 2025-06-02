import type { NextConfig } from "next";

const apiDomain = process.env.NEXT_PUBLIC_API_URL ? new URL(process.env.NEXT_PUBLIC_API_URL).hostname : null;

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', ...(apiDomain ? [apiDomain] : [])],
  },
};

export default nextConfig;
