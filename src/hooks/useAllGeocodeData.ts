import { useState, useCallback } from "react";
import axios from "axios";
import type { IGeocodeEtcData } from "@/src/commons/types";
import { useAllGeocode } from "../commons/context/allGeocodeProvider";

export const useAllGeocodeData = (
  buildingType: string
): {
  geocodeResults: IGeocodeEtcData[];
  loading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
} => {
  console.log("currentBuildingType", buildingType);
  const { geocodeResults, setGeocodeResults } = useAllGeocode();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (geocodeResults.length > 0) return; // 이미 데이터가 있는 경우 요청을 하지 않음
    setLoading(true);
    try {
      const response = await axios.get<IGeocodeEtcData[]>(`/api/fetchAllGeocode`, {
        params: { buildingType },
      });
      setGeocodeResults(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [buildingType, geocodeResults, setGeocodeResults]);

  return { geocodeResults, loading, error, fetchData };
};
