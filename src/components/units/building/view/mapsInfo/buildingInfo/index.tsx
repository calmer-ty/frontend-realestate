import BuildingInfoTop from "./top";
import BuildingInfoBottom from "./bottom";

import type { Dispatch, SetStateAction } from "react";
import type { IFirestore, IGeocodeData } from "@/src/commons/types";
interface IBuildingInfoProps {
  selectedData: IGeocodeData;
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | undefined>>;
  matchingData: IFirestore[];
  buildingType: string;
  mapMode?: boolean;
}

export default function BuildingInfo({ selectedData, setSelectedData, matchingData, buildingType, mapMode }: IBuildingInfoProps): JSX.Element {
  return (
    <>
      {selectedData != null && (
        <>
          <BuildingInfoTop selectedData={selectedData} setSelectedData={setSelectedData} buildingType={buildingType} />
          {/* 등록된 건물 정보 */}
          {mapMode === false && <BuildingInfoBottom selectedData={selectedData} matchingData={matchingData} />}
          {mapMode === true && <BuildingInfoBottom selectedData={selectedData} matchingData={matchingData} />}
        </>
      )}
    </>
  );
}
