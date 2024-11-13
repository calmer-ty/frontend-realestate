"use client";

import Nav from "../nav";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

import * as S from "./styles";
import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <S.Header>
      <h1 id="logo">
        <Link href="/">
          <HomeWorkIcon color="primary" fontSize="large" />
        </Link>
      </h1>
      <Nav />
    </S.Header>
  );
}
