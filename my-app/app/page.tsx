"use client";
import LayoutHeader from "@/component/commons/layout/header";
import LayoutMain from "@/component/commons/layout/main";

import * as S from "./styles";

export default function Home(): JSX.Element {
  return (
    <S.Wrap>
      <LayoutHeader />
      <LayoutMain />
    </S.Wrap>
  );
}
