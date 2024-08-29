/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "calmer96.store"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**", // 정확한 경로 설정
      },
    ],
  },
};

export default nextConfig;
