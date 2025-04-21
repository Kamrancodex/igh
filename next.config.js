/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com", "utfs.io"],
  },
};

module.exports = nextConfig;
