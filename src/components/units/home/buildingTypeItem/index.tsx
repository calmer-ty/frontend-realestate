import Link from "next/link";
// import { useState } from "react";
// import { useFetchAllGeocode } from "@/src/hooks/useFetchAllGeocode";
// import type { MouseEventHandler } from "react";
import type { IBuildingTypeItemProps } from "../types";
import * as S from "./styles";

export default function BuildingTypeItem({ href, title, description, icon }: IBuildingTypeItemProps): JSX.Element {
  // const [currentBuildingType, setCurrentBuildingType] = useState<string>("");
  // const fetchBuildingsData: MouseEventHandler<HTMLDivElement> = async (event) => {
  //   const target = event.currentTarget;
  //   console.log("target:::", target);
  //   const buildingType = target.getAttribute("data-href") ?? "값 없음";
  //   setCurrentBuildingType(buildingType);
  // };

  // useFetchAllGeocode(currentBuildingType);

  const isDisabled = href === undefined;

  return (
    // <S.Container isDisabled={isDisabled} data-href={href} onMouseEnter={fetchBuildingsData}>
    <S.Container isDisabled={isDisabled} data-href={href}>
      {isDisabled ? (
        <div className="textWrap">
          <h2>{title}</h2>
          <p>준비 중</p>
          <div className="iconWrap">{icon}</div>
        </div>
      ) : (
        <Link href={`/${href}`}>
          <div className="textWrap">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="iconWrap">{icon}</div>
        </Link>
      )}
    </S.Container>
  );
}
