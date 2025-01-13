import { useCallback, useState } from "react";

import type { IGeocodeData } from "@/src/commons/types";
import axios from "axios";

interface IUseFetchGeocodeDataReturn {
  geocodeData: IGeocodeData[];
  fetchGeocodeData: (regionCode: string) => Promise<void>;
}

export const useFetchGeocodeData = (regionCode: string | undefined, buildingType: string): IUseFetchGeocodeDataReturn => {
  const [geocodeData, setGeocodeData] = useState<IGeocodeData[]>([]);

  const fetchGeocodeData = useCallback(
    async (): Promise<void> => {
      try {
        const response = await axios.get<IGeocodeData[]>("/api/fetchAllGeocode", {
          params: { buildingType, regionCode },
        });
        if (response.status === 200) {
          setGeocodeData(response.data);
          // console.log("Fetched geocode data:", response.data);
        } else {
          throw new Error("Failed to fetch geocode data");
        }
      } catch (err) {
        console.error("Error fetching geocode data:", err);
      }
    },
    [buildingType, regionCode] // buildingType이 변경될 때만 함수가 재정의됨
  );

  return { geocodeData, fetchGeocodeData };
};
