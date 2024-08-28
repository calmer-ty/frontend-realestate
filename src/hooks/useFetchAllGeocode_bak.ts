import axios from "axios";
import { useState, useEffect } from "react";
import { useAllGeocodeContext } from "../commons/context/allGeocodeProvider";

import type { IGeocodeEtcData, IUseFetchAllGeocodeProps } from "@/src/commons/types";

export const useFetchAllGeocode = (buildingType: string): IUseFetchAllGeocodeProps => {
  const { geocodeResults, setGeocodeResults } = useAllGeocodeContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await axios.get<IGeocodeEtcData[]>("/api/fetchAllGeocode?buildingType=apartment");
        const data = response.data; // 이미 파싱된 데이터
        setGeocodeResults(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [buildingType, setGeocodeResults]);

  return { geocodeResults, loading, error };
};
