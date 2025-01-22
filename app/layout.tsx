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
