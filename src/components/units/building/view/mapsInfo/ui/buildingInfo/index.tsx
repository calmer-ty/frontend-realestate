import BuildingInfoBasic from "./basic";
import BuildingInfoListing from "./listing";

import type { Dispatch, SetStateAction } from "react";
import type { IFirestore, IGeocodeData } from "@/src/commons/types";
interface IBuildingInfoProps {
  selectedData: IGeocodeData;
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | undefined>>;
  matchingData: IFirestore[];
  buildingType: string;
  mapMode?: boolean;
}

export default function BuildingInfo({ selectedData, setSelectedData, mapMode, matchingData, buildingType }: IBuildingInfoProps): JSX.Element {
  console.log(mapMode);
  return (
    <>
      {selectedData != null && (
        <>
          <BuildingInfoBasic selectedData={selectedData} setSelectedData={setSelectedData} buildingType={buildingType} />
          {mapMode === false && <BuildingInfoListing selectedData={selectedData} matchingData={matchingData} />}
        </>
      )}
    </>
  );
}
