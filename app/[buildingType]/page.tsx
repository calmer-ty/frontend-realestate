import { useEffect, useState } from "react";

import BuildingView from "@/src/components/units/buildings/view";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import type { IBuildingParams } from "@/src/commons/types";
interface IBuildingParamsProps {
  params: Promise<IBuildingParams>;
}

export default function BuildingsPage({ params }: IBuildingParamsProps): JSX.Element {
  // const buildingType = params.buildingType; // URL 파라미터 추출
  const [buildingType, setBuildingType] = useState<string | null>(null);

  // params를 비동기적으로 처리하려면 await로 기다려야 함
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const resolvedParams = await params;
      setBuildingType(resolvedParams.buildingType);
    };

    void fetchData();
  }, [params]);

  if (buildingType === null) {
    return <LoadingSpinner size={100} />;
  }

  return <BuildingView buildingType={buildingType} />;
}
