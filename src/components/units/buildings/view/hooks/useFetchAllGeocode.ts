import axios from "axios";
import { useState, useCallback, useEffect } from "react";

import type { IGeocodeData } from "@/src/commons/types";

interface IUseFetchAllGeocode {
  data: IGeocodeData[];
  loading: boolean;
  error: Error | null;
}

export const useFetchAllGeocode = (buildingType: string, regionCode: string | undefined): IUseFetchAllGeocode => {
  const [data, setData] = useState<IGeocodeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<IGeocodeData[]>("/api/fetchAllGeocode", {
        params: { buildingType, regionCode },
      });
      setData(response.data);
    } catch (error) {
      console.error("fetchAllGeocode 에러입니다 :", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [buildingType, regionCode]);

  useEffect(() => {
    if (typeof buildingType === "string" && buildingType !== "") {
      void fetchData();
    }
  }, [buildingType, regionCode, fetchData]); // fetchData가 변경될 때도 실행됨

  return { data, loading, error };
};
