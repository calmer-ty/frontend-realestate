import { useCallback, useState } from "react";

import type { IBuildingDataParamsOptional, IBuildingItem } from "@/src/commons/types";
import axios from "axios";

interface IUseFetchOfficetelDataReturn {
  officetelDatas: IBuildingItem[];
  fetchOfficetelDatas: () => Promise<void>;
}

export const useFetchOfficetelData = ({ regionCode, buildingType }: IBuildingDataParamsOptional): IUseFetchOfficetelDataReturn => {
  const [officetelDatas, setOfficetelDatas] = useState<IBuildingItem[]>([]);

  const fetchOfficetelDatas = useCallback(async (): Promise<void> => {
    if (regionCode === undefined || buildingType === undefined) {
      console.error("존재하지 않는 지역입니다.");
      return;
    }

    try {
      const response = await axios.get<IBuildingItem[]>("/api/fetchOfficetel", {
        params: { regionCode, buildingType },
      });

      if (response.status === 200) {
        setOfficetelDatas(response.data);
        // console.log("Fetched officetel data:", response.data); // 받은 데이터 로그 출력
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [regionCode, buildingType]);
  return { officetelDatas, fetchOfficetelDatas };
};
