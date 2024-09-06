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
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  // pages: {
  //   signIn: "/",
  // },
  callbacks: {
    async session({ session, token }: { session: ICustomSession; token: JWT }) {
      // console.log("=== token ===", token);
      if (token != null && session.user != null) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
