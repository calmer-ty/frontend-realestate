// hooks/usePreloadGeocodeData.ts
import { useState, useCallback } from "react";
import axios from "axios";
import type { IGeocodeEtcData } from "@/src/types";

export const useAllGeocodeData = (): {
  geocodeResults: IGeocodeEtcData[];
  loading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
} => {
  const [geocodeResults, setGeocodeResults] = useState<IGeocodeEtcData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<IGeocodeEtcData[]>("/api/fetchAllGeocode");
      setGeocodeResults(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { geocodeResults, loading, error, fetchData };
};
