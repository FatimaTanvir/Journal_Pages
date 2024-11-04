/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
    ],
  },
  experimental: {
    esmExternals: true, // Enable this for native ESM support in Next.js
  },
};

export default nextConfig;
