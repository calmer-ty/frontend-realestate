"use client";

import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="header-inner">
            <h1 className="logo">logo</h1>
            <nav>
              <Link href="/view">view 페이지 이동</Link>
              <Link href="/write">write 페이지 이동</Link>
            </nav>
          </div>
        </header>
        <main>
          <div className="main-inner">{children}</div>
        </main>
      </body>
    </html>
  );
}
