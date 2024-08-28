import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { useAllGeocodeContext } from "../commons/context/allGeocodeProvider";

import type { IGeocodeEtcData, IUseFetchAllGeocodeDataProps } from "@/src/commons/types";

export const useFetchAllGeocodeData = (buildingType: string): IUseFetchAllGeocodeDataProps => {
  console.log(buildingType);
  console.log(typeof buildingType);
  const { geocodeResults, setGeocodeResults } = useAllGeocodeContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    // 이미 데이터가 있는 경우 패칭을 하지 않음
    if (geocodeResults.length > 0) {
      console.log("이미  geocodeResults 데이터가 있어서 재패치 하지 않습니다.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<IGeocodeEtcData[]>(`/api/fetchAllGeocode`, {
        params: { buildingType },
      });
      console.log("API response data:", response.data);
      setGeocodeResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [buildingType, setGeocodeResults, geocodeResults.length]);

  useEffect(() => {
    if (typeof buildingType === "string" && buildingType !== "") {
      void fetchData();
    }
  }, [buildingType, fetchData]); // fetchData가 변경될 때도 실행됨

  return { geocodeResults, loading, error };
};
