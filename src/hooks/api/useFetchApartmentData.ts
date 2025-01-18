import { useCallback, useState } from "react";

import type { IApartmentItem } from "@/src/commons/types";
import axios from "axios";

interface IUseFetchApartmentDataReturn {
  apartmentDatas: IApartmentItem[];
  fetchApartmentDatas: () => Promise<void>;
}

export const useFetchApartmentData = (regionCode: string | undefined): IUseFetchApartmentDataReturn => {
  const [apartmentDatas, setApartmentDatas] = useState<IApartmentItem[]>([]);

  const fetchApartmentDatas = useCallback(async (): Promise<void> => {
    if (regionCode === undefined) {
      console.error("존재하지 않는 지역입니다.");
      return;
    }

    try {
      const response = await axios.get<IApartmentItem[]>("/api/fetchApartment", {
        params: { regionCode },
      });

      if (response.status === 200) {
        setApartmentDatas(response.data);
        // console.log("Fetched apartment data:", response.data); // 받은 데이터 로그 출력
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [regionCode]);
  return { apartmentDatas, fetchApartmentDatas };
};
