/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
  },
  rewrites: async () => [
    {
      source: '/((?!_next|favicon.ico|sign-in|sign-up).*)',
      destination: '/',
    },
  ],
}

module.exports = nextConfig
