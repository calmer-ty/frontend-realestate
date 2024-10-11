"use client";

import { AllGeocodeProvider } from "@/src/commons/context/allGeocodeProvider";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Header from "@/src/components/layout/header";

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
              <Header />
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
