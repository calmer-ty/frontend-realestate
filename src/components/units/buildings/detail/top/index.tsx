import Image from "next/image";
import BasicUnImage from "@/src/components/commons/unImages/basic";
import type { IBuildingDetailProps } from "../types";
import * as S from "./styles";

export default function BuildingDetailTop({ buildingData }: IBuildingDetailProps): JSX.Element {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <S.MViewContents {...settings}>
        {buildingData.imageUrls?.map((el) => {
          return (
            <figure key={el}>
              <Image src={el} alt={"buildImg"} fill />
            </figure>
          );
        })}
      </S.MViewContents>
      <S.ViewContents>
        <figure className="mainImg">
          <Image src={buildingData.imageUrls?.[0] ?? "No address available"} alt="buildImg" fill />
        </figure>
        <div className="subImgWrap">
          {[1, 2, 3, 4].map((index) => {
            const el = buildingData.imageUrls?.[index];
            return (
              <figure key={`${el}_${index}`}>
                {el !== undefined ? <Image src={el} alt={"buildImg"} fill /> : <BasicUnImage key={`placeholder_${index}`} width="100%" height="100%" fontSize="36px" />}
              </figure>
            );
          })}
        </div>
      </S.ViewContents>
    </>
  );
}
