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
        <div id="wrapper">
          <header>
            <div className="header-inner">
              <h1 className="logo">logo</h1>
              <nav>
                <Link href="/buildings/view/apartment">
                  apartment 페이지 이동
                </Link>
                <Link href="/buildings/write">write 페이지 이동</Link>
                <Link href="/view">geo-test 페이지 이동</Link>
              </nav>
            </div>
          </header>
          <main>
            <div className="main-inner">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
