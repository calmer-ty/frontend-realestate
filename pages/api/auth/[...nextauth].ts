import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

interface ICustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface ICustomSession extends Session {
  user?: ICustomUser;
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "클라이언트 아이디 없음",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "클라이언트 비밀번호 없음",
    }),
  ],
  pages: {
    signIn: "/auth/signin", // 로그인 페이지 경로
    error: "/auth/error", // 오류 페이지 경로
  },
  callbacks: {
    async session({ session, token }: { session: ICustomSession; token: JWT }) {
      // console.log("=== token ===", token);
      if (token != null && session.user != null) {
        session.user.id = token.sub;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect URL: ", url);
      console.log("Base URL: ", baseUrl); // baseUrl 값이 localhost로 출력되면 환경 변수가 제대로 설정되지 않은 것입니다.
      return baseUrl; // baseUrl을 사용해 리디렉션
    },
  },
  session: {
    // 세션 전략: 'jwt'는 토큰 기반, 'database'는 데이터베이스 기반
    strategy: "jwt",
    maxAge: 60 * 60, // 세션 유지 시간 (1시간)
  },
  jwt: {
    maxAge: 60 * 60, // JWT 토큰 유지 시간 (1시간)
  },
  // next-auth 설정에서 쿠키 관련 세부 사항
  // cookies: {
  //   sessionToken: {
  //     name: "next-auth.session-token",
  //     options: {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === "production", // 배포 환경에서만 secure 쿠키 사용
  //       sameSite: "strict",
  //     },
  //   },
  // },
});
