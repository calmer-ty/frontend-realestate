/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**", // 정확한 경로 설정
      },
    ],
  },
  env: {
    NEXT_PUBLIC_NCP_CLIENT_ID: process.env.NEXT_PUBLIC_NCP_CLIENT_ID,
    NEXT_PUBLIC_NCP_CLIENT_SECRET: process.env.NEXT_PUBLIC_NCP_CLIENT_SECRET,
    NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA: process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA,
    NEXT_PUBLIC_FIREBASE_KEY: process.env.NEXT_PUBLIC_FIREBASE_KEY,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  },
};

export default nextConfig;
