/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "swng-media.s3.amazonaws.com",
      "s3.ap-south-1.amazonaws.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
