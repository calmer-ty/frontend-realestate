"use client";

import Header from "@/src/components/layout/header";
import Head from "next/head"; // next/head를 import
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="부동산 웹 어플리케이션" />
        <meta property="og:description" content="거래된 매물을 조회하고, 직접 매물을 등록해보세요." />
        <meta property="og:url" content="https://www.calmer96.store" />
        <meta property="og:image" content="/images/main.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <div id="wrapper">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
