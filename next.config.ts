import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
