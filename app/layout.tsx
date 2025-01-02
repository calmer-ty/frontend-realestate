"use client";

import Header from "@/src/components/layout/header";
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
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
