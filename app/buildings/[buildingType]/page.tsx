import BuildingView from "@/src/components/units/buildings/view";
import type { IBuildingParams } from "@/src/commons/types";

export default function BuildingsPage({ params }: { params: IBuildingParams }): JSX.Element {
  const buildingType = params.buildingType; // URL 파라미터 추출
  return <BuildingView buildingType={buildingType} />;
}
