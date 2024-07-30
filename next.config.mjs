/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ["firebasestorage.googleapis.com"], // Firebase Storage의 도메인 추가
  },
};

export default nextConfig;
