"use client";

import Home from "@/src/components/units/home";
import Head from "next/head";

export default function HomePage(): JSX.Element {
  return (
    <>
      <Head>
        <meta property="og:title" content="부동산 웹 어플리케이션" />
        <meta property="og:description" content="거래된 매물을 조회하고, 직접 매물을 등록해보세요." />
        <meta property="og:url" content="/images/main.jpg" />
        <meta property="og:image" content="https://www.calmer96.store" />
      </Head>
      <Home />
    </>
  );
}
