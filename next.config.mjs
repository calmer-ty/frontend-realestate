/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "", // 기본적으로 포트는 빈 문자열로 설정
        pathname: "/**", // 모든 경로를 허용
      },
    ],
  },
};

export default nextConfig;
