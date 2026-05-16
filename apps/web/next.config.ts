import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: [
    '@surte/core',
    '@surte/design-system',
    '@surte/shell-runtime',
  ],
}

export default nextConfig
