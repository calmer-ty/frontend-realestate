import BuildingInfoTop from "./top";
import BuildingInfoBottom from "./bottom";

import type { Dispatch, SetStateAction } from "react";
import type { IFirestore, IGeocodeData } from "@/src/commons/types";
interface IBuildingInfoProps {
  selectedData: IGeocodeData;
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | undefined>>;
  matchingDatas: IFirestore[];
  buildingType: string;
}

export default function BuildingInfo(props: IBuildingInfoProps): JSX.Element {
  const { selectedData, setSelectedData, matchingDatas, buildingType } = props;

  return (
    <>
      {selectedData != null && (
        <>
          <BuildingInfoTop selectedData={selectedData} setSelectedData={setSelectedData} buildingType={buildingType} />
          {/* 등록된 건물 정보 */}
          <BuildingInfoBottom selectedData={selectedData} matchingDatas={matchingDatas} />
        </>
      )}
    </>
  );
}
