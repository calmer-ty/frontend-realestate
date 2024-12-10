import axios from "axios";
import { useState, useCallback, useEffect } from "react";

import type { IGeocodeData, IUseFetchAllGeocodeProps } from "@/src/commons/types";

export const useFetchAllGeocode = (buildingType: string): IUseFetchAllGeocodeProps => {
  const [geocodeResults, setGeocodeResults] = useState<IGeocodeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<IGeocodeData[]>(`/api/fetchAllGeocode`, {
        params: { buildingType },
      });
      setGeocodeResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [buildingType]);

  // console.log("[geocodeResults] ", geocodeResults);

  useEffect(() => {
    if (typeof buildingType === "string" && buildingType !== "") {
      void fetchData();
    }
  }, [buildingType, fetchData]); // fetchData가 변경될 때도 실행됨

  return { geocodeResults, loading, error };
};
