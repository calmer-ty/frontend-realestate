"use client";

import Link from "next/link";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { AllGeocodeProvider } from "@/src/commons/context/allGeocodeProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body>
        <AllGeocodeProvider>
          <div id="wrapper">
            <header>
              <div id="header-inner">
                <h1 id="logo">
                  <Link href="/">
                    <HomeWorkIcon color="primary" fontSize="large" />
                  </Link>
                </h1>
                <nav>
                  <Link href="/buildings">지도</Link>
                  <Link href="/buildings/new">방 내놓기</Link>
                </nav>
              </div>
            </header>
            <main>
              <div id="main-inner">{children}</div>
            </main>
          </div>
        </AllGeocodeProvider>
      </body>
    </html>
  );
}
