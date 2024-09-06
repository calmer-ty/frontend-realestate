"use client";

import Link from "next/link";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { AllGeocodeProvider } from "@/src/commons/context/allGeocodeProvider";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Nav from "@/src/components/layout/header";

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
                  <Nav />
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
