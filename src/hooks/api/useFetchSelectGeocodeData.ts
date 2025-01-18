import { useCallback, useState } from "react";

import type { IGeocode } from "@/src/commons/types";
import axios from "axios";

interface IUseFetchSelectGeocodeDataParams {
  regionName: string | undefined;
  buildingType: string;
}
interface IUseFetchSelectGeocodeDataReturn {
  geocode: IGeocode | undefined;
  fetchGeocodeData: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useFetchSelectGeocodeData = ({ regionName, buildingType }: IUseFetchSelectGeocodeDataParams): IUseFetchSelectGeocodeDataReturn => {
  const [geocode, setGeocodeData] = useState<IGeocode | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGeocodeData = useCallback(
    async (): Promise<void> => {
      setLoading(true); // 데이터 요청 시작 시 로딩 상태 true로 설정
      setError(null); // 이전 에러 상태 초기화
      try {
        const response = await axios.get<IGeocode>("/api/fetchSelectGeocode", {
          params: { buildingType, regionName },
        });
        if (response.status === 200) {
          setGeocodeData(response.data);
          // console.log("Fetched geocode data:", response.data);
        } else {
          throw new Error("Failed to fetch geocode data");
        }
      } catch (err) {
        setError("Error fetching geocode data"); // 에러 발생 시 에러 메시지 설정
      } finally {
        setLoading(false); // 데이터 요청이 끝났으므로 로딩 상태 false로 설정
      }
    },
    [buildingType, regionName] // buildingType이 변경될 때만 함수가 재정의됨
  );

  return { geocode, fetchGeocodeData, loading, error };
};
