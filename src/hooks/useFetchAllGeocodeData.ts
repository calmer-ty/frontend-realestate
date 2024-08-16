import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { useAllGeocodeContext } from "../commons/context/allGeocodeProvider";

import type { IGeocodeEtcData, IUseAllGeocodeDataProps } from "@/src/commons/types";

export const useFetchAllGeocodeData = (buildingType: string): IUseAllGeocodeDataProps => {
  const { geocodeResults, setGeocodeResults } = useAllGeocodeContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    // buildingType이 없거나 빈 문자열인 경우 패칭을 하지 않도록 함
    if (typeof buildingType !== "string" || buildingType.trim() === "") {
      console.warn("Invalid buildingType, skipping fetchData");
      return;
    }

    // 이미 데이터가 있는 경우 패칭을 하지 않음
    // if (geocodeResults.length > 0) {
    //   console.log("Data already fetched, skipping fetchData");
    //   return;
    // }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<IGeocodeEtcData[]>(`/api/fetchAllGeocode`, {
        params: { buildingType },
      });
      setGeocodeResults(response.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [buildingType, setGeocodeResults]);

  useEffect(() => {
    if (typeof buildingType === "string" && buildingType.trim() !== "") {
      void fetchData();
    }
  }, [buildingType, fetchData]);

  return { geocodeResults, loading, error, fetchData };
};
