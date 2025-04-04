import { useMemo } from "react";
// import dynamic from "next/dynamic";

import ImgSkeleton from "@/src/components/commons/skeleton/figure";
import HomeInfo from "../info";
import ListItem from "./listItem";

import * as S from "./styles";
import type { IFirestore } from "@/src/commons/types";

interface IHomeSecondaryProps {
  firestoreData: IFirestore[];
}

const settings = {
  arrows: false,
  dots: true,
  slidesToShow: 1,
  autoplay: true,
  autoplaySpeed: 4000,
};

// const PieChartComponent = dynamic(() => import("../pieChart"), { ssr: false, loading: () => <ImgSkeleton height="16rem" /> });

export default function HomeSecondary({ firestoreData }: IHomeSecondaryProps): JSX.Element {
  const randomFirestores = useMemo(() => {
    return firestoreData.sort(() => 0.5 - Math.random()).slice(0, 5);
  }, [firestoreData]);

  return (
    <S.Container>
      <div className="sliderWrap">
        {randomFirestores.length !== 0 ? (
          <S.SliderStyle {...settings}>
            {randomFirestores.map((el, index) => (
              <ListItem key={`${el._id}_${index}`} el={el} />
            ))}
          </S.SliderStyle>
        ) : (
          <ImgSkeleton />
        )}
      </div>

      <div className="infoWrap">
        <HomeInfo title="부동산 뉴스" desc="최신 부동산 시장 동향과 주요 정책을 신속하게 확인하세요." href="https://www.karnews.or.kr" cover="/images/news.jpg" />
        <HomeInfo title="부동산 거래 신고" desc="부동산 거래 신고 절차와 관련 정보를 확인하세요." href="https://rtms.molit.go.kr" cover="/images/write.jpg" />
      </div>
    </S.Container>
  );
}
