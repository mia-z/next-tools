/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    urlImports: ['https://example.com/modules/'],
  }
}

module.exports = nextConfig
