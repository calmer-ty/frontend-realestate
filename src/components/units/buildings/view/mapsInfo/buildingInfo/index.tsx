import BuildingInfoTop from "./top";
import BuildingInfoBottom from "./bottom";

import type { Dispatch, SetStateAction } from "react";
import type { IFirestore, IGeocodeData } from "@/src/commons/types";
interface IBuildingInfoProps {
  selectedData: IGeocodeData;
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | null>>;
  matchingDatas: IFirestore[];
}

export default function BuildingInfo(props: IBuildingInfoProps): JSX.Element {
  const { selectedData, setSelectedData, matchingDatas } = props;

  return (
    <>
      {selectedData != null && (
        <>
          <BuildingInfoTop selectedData={selectedData} setSelectedData={setSelectedData} />
          {/* 등록된 건물 정보 */}
          <BuildingInfoBottom selectedData={selectedData} matchingDatas={matchingDatas} />
        </>
      )}
    </>
  );
}
