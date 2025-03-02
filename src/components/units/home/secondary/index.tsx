import { useMemo } from "react";
import dynamic from "next/dynamic";

import ListItem from "./listItem";
import ImgSkeleton from "@/src/components/commons/skeleton/figure";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import * as S from "./styles";
import type { IFirestore } from "@/src/commons/types";
interface IHomeSecondaryProps {
  firestoreData: IFirestore[];
}

const settings = {
  arrows: false,
  slidesToShow: 1,
  // slidesToScroll: 5,
  // initialSlide: 0,
  // autoplay: true,
  // autoplaySpeed: 4000,
  // responsive: [
  //   {
  //     breakpoint: 1690,
  //     settings: {
  //       autoplay: true,
  //       dots: true,
  //       slidesToShow: 3,
  //       slidesToScroll: 3,
  //     },
  //   },
  //   {
  //     breakpoint: 1024,
  //     settings: {
  //       autoplay: true,
  //       dots: true,
  //       slidesToShow: 2,
  //       slidesToScroll: 2,
  //     },
  //   },
  //   {
  //     breakpoint: 480,
  //     settings: {
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //       autoplay: true,
  //       dots: true,
  //     },
  //   },
  // ],
};

const PieChartComponent = dynamic(() => import("../pieChart"), { ssr: false, loading: () => <ImgSkeleton height="16rem" /> });

export default function HomeSecondary({ firestoreData }: IHomeSecondaryProps): JSX.Element {
  const randomFirestores = useMemo(() => {
    return firestoreData.sort(() => 0.5 - Math.random()).slice(0, 5);
  }, [firestoreData]);

  return (
    <S.Container>
      {randomFirestores.length !== 0 ? (
        <Slider {...settings}>
          {randomFirestores.map((el, index) => (
            <ListItem key={`${el._id}_${index}`} el={el} />
          ))}
        </Slider>
      ) : (
        <ImgSkeleton height="14rem" />
      )}

      <PieChartComponent />
    </S.Container>
  );
}
