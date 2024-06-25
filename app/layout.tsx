"use client";
import "../common/styles/globals.css";
import "../common/styles/layout.css";

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
            <nav>nav</nav>
          </div>
        </header>
        <main>
          <div className="main-inner">{children}</div>
        </main>
      </body>
    </html>
  );
}
