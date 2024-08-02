import { useState, useCallback, useEffect } from "react";
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

  // buildingType이 변경될 때 fetchData 호출
  // data-href는 html에 들어있고 이 버튼의 값을 구하기 위해선 버튼이 렌더링 된 후에, 호버를 해야 값을 뽑아낼 수 있다.
  // 그렇기 때문에 useEffect를 사용하여 렌더링 후에 값을 호출하는 것이다.
  useEffect(() => {
    if (buildingType !== "") {
      void fetchData();
    }
  }, [buildingType, fetchData]);

  return { geocodeResults, loading, error, fetchData };
};
