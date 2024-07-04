"use client";

import * as S from "./styles";
export default function BuildingsViewPage(): JSX.Element {
  return (
    <S.Wrapper>
      <S.Category>
        <div>Main Category</div>
        <div>Sub Category</div>
      </S.Category>
      <S.Contents>
        <div>Build List</div>
        <div>Map</div>
      </S.Contents>
    </S.Wrapper>
  );
}
