import axios from "axios";
import { useState, useCallback, useEffect } from "react";

import type { IApartmentItem } from "@/src/commons/types";

export interface IUseFetchAllGeocodeProps {
  data: IApartmentItem[];
  loading: boolean;
  error: Error | null;
}

export const useFetchAllGeocode = (buildingType: string): IUseFetchAllGeocodeProps => {
  const [data, setGeocodeResults] = useState<IApartmentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<IApartmentItem[]>(`/api/fetchAllGeocode`, {
        params: { buildingType },
      });
      console.log("useFetchAllGeocode response === ", response);
      setGeocodeResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [buildingType]);

  useEffect(() => {
    if (typeof buildingType === "string" && buildingType !== "") {
      void fetchData();
    }
  }, [buildingType, fetchData]); // fetchData가 변경될 때도 실행됨

  return { data, loading, error };
};
