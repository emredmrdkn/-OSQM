import type { NextConfig } from 'next';
import path from 'path';

const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  ...(isStaticExport ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

