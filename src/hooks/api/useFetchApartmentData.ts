import { useCallback, useState } from "react";

import type { IApartmentItem } from "@/src/commons/types";
import axios from "axios";

interface IUseFetchApartmentDataReturn {
  apartmentData: IApartmentItem[];
  fetchApartmentData: (regionCode: string) => Promise<void>;
}

export const useFetchApartmentData = (regionCode: string | undefined): IUseFetchApartmentDataReturn => {
  const [apartmentData, setApartmentData] = useState<IApartmentItem[]>([]);

  const fetchApartmentData = useCallback(async (): Promise<void> => {
    if (regionCode === undefined) {
      console.error("존재하지 않는 지역입니다.");
      return;
    }

    try {
      const response = await axios.get<IApartmentItem[]>("/api/fetchApartment", {
        params: { regionCode },
      });

      if (response.status === 200) {
        setApartmentData(response.data);
        // console.log("Fetched apartment data:", response.data); // 받은 데이터 로그 출력
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [regionCode]);
  return { apartmentData, fetchApartmentData };
};
