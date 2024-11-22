"use client";

// import { AllGeocodeProvider } from "@/src/commons/context/allGeocodeProvider";
import { SessionProvider } from "next-auth/react";
import Header from "@/src/components/layout/header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <SessionProvider>
      {/* <AllGeocodeProvider> */}
      <html lang="en">
        <body>
          <div id="wrapper">
            <Header />
            <main>{children}</main>
          </div>
        </body>
      </html>
      {/* </AllGeocodeProvider> */}
    </SessionProvider>
  );
}
