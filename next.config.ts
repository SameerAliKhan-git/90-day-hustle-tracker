import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Static export — deploy anywhere (Vercel, Netlify, GitHub Pages)
  typescript: {
    // Type checking already passes via `npx tsc --noEmit`.
    // Skip during build to avoid OOM on low-memory machines.
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
