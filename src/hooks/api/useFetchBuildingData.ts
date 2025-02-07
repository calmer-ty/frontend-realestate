import { useCallback, useState } from "react";

import type { IBuildingDataParamsOptional, IBuildingItem } from "@/src/commons/types";
import axios from "axios";

interface IUseFetchBuildingDataReturn {
  buildingDatas: IBuildingItem[];
  fetchBuildingDatas: () => Promise<void>;
}

export const useFetchBuildingData = ({ regionCode, regionName, buildingType }: IBuildingDataParamsOptional): IUseFetchBuildingDataReturn => {
  const [buildingDatas, setBuildingDatas] = useState<IBuildingItem[]>([]);

  const fetchBuildingDatas = useCallback(async (): Promise<void> => {
    if (regionCode === undefined || regionName === undefined || buildingType === undefined) {
      console.error("존재하지 않는 지역입니다.");
      return;
    }

    try {
      const response = await axios.get<IBuildingItem[]>("/api/fetchBuilding", {
        params: { regionCode, regionName, buildingType },
      });

      if (response.status === 200) {
        setBuildingDatas(response.data);
        // console.log("Fetched building data:", response.data); // 받은 데이터 로그 출력
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [regionCode, regionName, buildingType]);
  return { buildingDatas, fetchBuildingDatas };
};
