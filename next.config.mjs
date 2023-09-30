/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.discordapp.com", "imgs.search.brave.com", "i.imgur.com"],
  },
  experimental: {
    serverActions: true,
  },
}

export default nextConfig
