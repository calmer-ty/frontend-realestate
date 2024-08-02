import { useCallback, useState } from "react";
import { useAllGeocodeData } from "./useAllGeocodeData";
import type { IGeocodeEtcData } from "../commons/types";

interface UsePreloadedDataResult {
  preloadedData: IGeocodeEtcData[];
  isLoading: boolean;
  error: Error | null;
  handleMouseEnter: () => Promise<void>;
}

export function usePreloadedData(): UsePreloadedDataResult {
  const [preloadedData, setPreloadedData] = useState<IGeocodeEtcData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // 데이터 프리로딩
  const { geocodeResults, loading, error: hookError, fetchData } = useAllGeocodeData();

  // 마우스 오버 시 데이터 설정
  const handleMouseEnter = useCallback(async (): Promise<void> => {
    if (preloadedData.length === 0 && !loading) {
      setIsLoading(true);
      try {
        await fetchData();
        setPreloadedData(geocodeResults);
      } catch (err) {
        setError(hookError);
      } finally {
        setIsLoading(false);
      }
    }
  }, [preloadedData, loading, fetchData, geocodeResults, hookError]);

  return { preloadedData, isLoading, error, handleMouseEnter };
}
