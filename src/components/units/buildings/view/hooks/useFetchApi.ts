import { useEffect } from "react";

import type { IApartmentItem } from "@/src/commons/types";

interface IUseFetchApiProps {
  regionName: string | undefined;
  regionCode: string | undefined;
  apartmentData: IApartmentItem[];
  fetchApartmentData: (regionCode: string) => Promise<void>;
  fetchGeocodeData: (regionName: string) => Promise<void>;
  fetchGeocodeDatas: (regionName: string, regionCode: string) => Promise<void>;
}

export const useFetchApi = ({ regionName, regionCode, apartmentData, fetchApartmentData, fetchGeocodeData, fetchGeocodeDatas }: IUseFetchApiProps): void => {
  // regionCode가 변경되면 아파트 데이터를 요청
  // useEffect(() => {
  //   if (regionCode === undefined) return;
  //   void fetchRegionData();
  // }, [regionCode, fetchRegionData]);

  //
  useEffect(() => {
    if (regionName === undefined) return;
    void fetchGeocodeData(regionName);
  }, [regionName, fetchGeocodeData]);

  // regionCode가 변경되면 아파트 데이터를 요청
  useEffect(() => {
    if (regionCode === undefined) return;
    void fetchApartmentData(regionCode);
  }, [regionCode, fetchApartmentData]);

  // apartmentData가 변경되면 지오코드 데이터를 요청
  useEffect(() => {
    if (regionName === undefined || regionCode === undefined || apartmentData === null) return;
    void fetchGeocodeDatas(regionName, regionCode);
  }, [regionName, regionCode, apartmentData, fetchGeocodeDatas]);
};
