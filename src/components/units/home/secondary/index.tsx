import { useMemo } from "react";

import ImgSkeleton from "@/src/components/commons/skeleton/figure";
import ListItem from "./listItem";

import * as S from "./styles";
import type { IFirestore } from "@/src/commons/types";

interface IHomeSecondaryProps {
  firestoreData: IFirestore[];
}

const settings = {
  arrows: false,
  dots: true,
  slidesToShow: 4,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
    {
      breakpoint: 1280, // 1280px 이하일 때
      settings: {
        slidesToShow: 3, // 예를 들어 2개만 보이게 변경
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function HomeSecondary({ firestoreData }: IHomeSecondaryProps): JSX.Element {
  const randomFirestores = useMemo(() => {
    return firestoreData.sort(() => 0.5 - Math.random()).slice(0, 5);
  }, [firestoreData]);

  return (
    <S.Container>
      <h2>추천하는 매물</h2>
      {randomFirestores.length !== 0 ? (
        <S.SliderStyle {...settings}>
          {randomFirestores.map((el, index) => (
            <ListItem key={`${el._id}_${index}`} el={el} />
          ))}
        </S.SliderStyle>
      ) : (
        <ImgSkeleton />
      )}
    </S.Container>
  );
}
