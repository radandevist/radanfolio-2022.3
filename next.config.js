/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.pexels.com",
      "res.cloudinary.com",
      "media.giphy.com"
    ],
  },
  experimental: { 
    nftTracing: true 
  }
};


module.exports = nextConfig;

