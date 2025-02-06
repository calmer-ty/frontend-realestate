import { useCallback, useState } from "react";

import type { IGeocodeData } from "@/src/commons/types";
import axios from "axios";

interface IUseFetchAllGeocodeDataParams {
  regionCode: string;
  buildingType: string;
}
interface IUseFetchAllGeocodeDataReturn {
  geocodeDatas: IGeocodeData[];
  fetchGeocodeDatas: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useFetchAllGeocodeData = ({ regionCode, buildingType }: IUseFetchAllGeocodeDataParams): IUseFetchAllGeocodeDataReturn => {
  const [geocodeDatas, setGeocodeDatas] = useState<IGeocodeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGeocodeDatas = useCallback(
    async (): Promise<void> => {
      setLoading(true); // 데이터 요청 시작 시 로딩 상태 true로 설정
      setError(null); // 이전 에러 상태 초기화
      try {
        const response = await axios.get<IGeocodeData[]>("/api/fetchAllGeocode", {
          params: { regionCode, buildingType },
        });
        if (response.status === 200) {
          setGeocodeDatas(response.data);
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
    [buildingType, regionCode] // buildingType이 변경될 때만 함수가 재정의됨
  );
  return { geocodeDatas, fetchGeocodeDatas, loading, error };
};
