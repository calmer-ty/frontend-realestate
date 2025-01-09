import { useMemo } from "react";
import ListItem from "./listItem";

import type { IRecommendedListProps } from "./types";
import * as S from "./styles";

export default function RecommendedList({ firestoreDatas }: IRecommendedListProps): JSX.Element {
  const randomFirestores = useMemo(() => {
    return firestoreDatas.sort(() => 0.5 - Math.random()).slice(0, 5);
  }, [firestoreDatas]);
  const settings = {
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1690,
        settings: {
          autoplay: true,
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          autoplay: true,
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <>
      <S.Container>
        <div className="inner">
          {/* <div className="innerBox"> */}
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
        {/* </div> */}
      </S.Container>
    </>
  );
}
