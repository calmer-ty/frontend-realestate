"use client";

import Link from "next/link";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { AllGeocodeProvider } from "@/src/commons/context/allGeocodeProvider";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <SessionProvider>
      <AllGeocodeProvider>
        <html lang="en">
          <body>
            <div id="wrapper">
              <header>
                <div id="header-inner">
                  <h1 id="logo">
                    <Link href="/">
                      <HomeWorkIcon color="primary" fontSize="large" />
                    </Link>
                  </h1>
                  <nav>
                    <Link href="/new">방 내놓기</Link>
                    <AuthButtons /> {/* 로그인 버튼 컴포넌트 추가 */}
                  </nav>
                </div>
              </header>
              <main>
                <div id="main-inner">{children}</div>
              </main>
            </div>
          </body>
        </html>
      </AllGeocodeProvider>
    </SessionProvider>
  );
}

function AuthButtons(): JSX.Element {
  const { data: session } = useSession();

  return (
    <>
      {session == null ? (
        <button onClick={() => signIn("google")}>Login with Google</button>
      ) : (
        <div>
          <p>Welcome, {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </>
  );
}
