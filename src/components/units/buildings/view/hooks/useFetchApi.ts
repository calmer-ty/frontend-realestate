import { useEffect } from "react";

import type { IApartmentItem } from "@/src/commons/types";

interface IUseFetchApiProps {
  regionName: string | undefined;
  regionCode: string | undefined;
  apartmentDatas: IApartmentItem[];
  fetchApartmentDatas: (regionCode: string) => Promise<void>;
  fetchGeocodeData: (regionName: string) => Promise<void>;
  fetchGeocodeDatas: (regionCode: string) => Promise<void>;
  fetchUserGeocodeDatas: () => Promise<void>;
}

export const useFetchApi = ({ regionName, regionCode, apartmentDatas, fetchApartmentDatas, fetchGeocodeData, fetchGeocodeDatas, fetchUserGeocodeDatas }: IUseFetchApiProps): void => {
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
    void fetchApartmentDatas(regionCode);
  }, [regionCode, fetchApartmentDatas]);

  // apartmentData가 변경되면 지오코드 데이터를 요청
  useEffect(() => {
    if (regionCode === undefined || apartmentDatas === null) return;
    void fetchGeocodeDatas(regionCode);
  }, [regionName, regionCode, apartmentDatas, fetchGeocodeDatas]);

  //
  useEffect(() => {
    // if (regionCode === undefined || apartmentData === null) return;
    void fetchUserGeocodeDatas();
  }, [fetchUserGeocodeDatas]);
};
