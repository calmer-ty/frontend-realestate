import { useCallback, useState } from "react";

import type { IGeocodeData } from "@/src/commons/types";
import axios from "axios";

interface IUseFetchGeocodeDataParams {
  regionName: string | undefined;
  regionCode: string | undefined;
  buildingType: string;
}
interface IUseFetchGeocodeDataReturn {
  geocodeData: IGeocodeData[];
  fetchGeocodeData: (regionCode: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useFetchGeocodeData = ({ regionName, regionCode, buildingType }: IUseFetchGeocodeDataParams): IUseFetchGeocodeDataReturn => {
  const [geocodeData, setGeocodeData] = useState<IGeocodeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGeocodeData = useCallback(
    async (): Promise<void> => {
      setLoading(true); // 데이터 요청 시작 시 로딩 상태 true로 설정
      setError(null); // 이전 에러 상태 초기화
      try {
        const response = await axios.get<IGeocodeData[]>("/api/fetchAllGeocode", {
          params: { buildingType, regionName, regionCode },
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
    [buildingType, regionName, regionCode] // buildingType이 변경될 때만 함수가 재정의됨
  );

  return { geocodeData, fetchGeocodeData, loading, error };
};
