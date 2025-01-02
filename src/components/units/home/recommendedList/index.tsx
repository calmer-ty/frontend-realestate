import ListItem from "./listItem";

import React from "react";

import type { IRecommendedListProps } from "./types";
import * as S from "./styles";

export default function RecommendedList({ firestoreDatas }: IRecommendedListProps): JSX.Element {
  const settings = {
    arrows: false,
    dots: true,
    infinite: firestoreDatas.length > 2,
    speed: 500,
    slidesToShow: firestoreDatas.length === 1 ? 1 : firestoreDatas.length === 2 ? 2 : firestoreDatas.length === 3 ? 3 : firestoreDatas.length === 4 ? 4 : 5,
    slidesToScroll: 5,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1690,
        settings: {
          slidesToShow: firestoreDatas.length === 1 ? 1 : firestoreDatas.length === 2 ? 2 : 3,
          slidesToScroll: firestoreDatas.length === 1 ? 1 : firestoreDatas.length === 2 ? 2 : 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: firestoreDatas.length === 1 ? 1 : 2,
          slidesToScroll: firestoreDatas.length === 1 ? 1 : 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const randomFirestores = firestoreDatas.sort(() => 0.5 - Math.random()).slice(0, 5);

  return (
    <S.Container>
      <div className="inner">
        <div className="innerBox">
          <h2>추천드리는 매물입니다.</h2>
          {randomFirestores.length !== 0 ? (
            <S.RegisteredList {...settings}>
              {randomFirestores.map((el, index) => (
                <ListItem key={`${el._id}_${index}`} el={el} />
              ))}
            </S.RegisteredList>
          ) : (
            <div className="unItems">추천드릴 매물이 없습니다</div>
          )}
        </div>
      </div>
    </S.Container>
  );
}
