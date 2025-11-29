import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nsdxlbgtkkcwoscmmgjc.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
    ], // tu dominio Supabase
  },
  // experimental: {
  //   serverActions: {
  //     allowedOrigins: ['localhost:3000','https://v3f7fj60-3000.brs.devtunnels.ms/'],
  //   }
  // }
};

export default nextConfig;
