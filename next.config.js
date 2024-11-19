/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [''],
  },
  // 禁用所有页面的预加载
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // 禁用预加载
    prefetchRegex: false,
  },
}

module.exports = nextConfig
