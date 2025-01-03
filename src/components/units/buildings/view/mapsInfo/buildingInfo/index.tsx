import BuildingInfoTop from "./top";
import BuildingInfoBottom from "./bottom";

import type { IBuildingInfoProps } from "./types";

export default function BuildingInfo(props: IBuildingInfoProps): JSX.Element {
  const { selectedData, firestoreData, buildingType } = props;

  return (
    <>
      {selectedData != null && (
        <>
          <BuildingInfoTop selectedData={selectedData} />
          {/* 등록된 건물 정보 */}
          <BuildingInfoBottom selectedData={selectedData} firestoreData={firestoreData} buildingType={buildingType} />
        </>
      )}
    </>
  );
}
