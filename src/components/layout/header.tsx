"use client";

import Link from "next/link";

import Nav from "./nav";

import * as S from "./styles";

export default function Header(): JSX.Element {
  return (
    <>
      <S.Header>
        <h1 id="logo">
          <Link href="/">
            <S.Logo color="primary" />
          </Link>
        </h1>
        <Nav />
      </S.Header>
      <S.FakeHeader />
    </>
  );
}
