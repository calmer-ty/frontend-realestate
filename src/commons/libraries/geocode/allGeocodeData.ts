import { apartmentData } from "../apartment/apartmentData";
import { geocodeApi } from "./geocodeApi";
import { getCachedGeocodeData, setGeocodeCache } from "./geocodeCache";

import type { IApartmentItem, IApartmentLocationData, IGeocodeEtcData } from "@/src/commons/types";

export const allGeocodeData = async (buildingType: string): Promise<IGeocodeEtcData[]> => {
  let results: IApartmentLocationData[];

  // buildingType에 따른 데이터 호출
  switch (buildingType) {
    case "apartment":
      results = await apartmentData();
      break;
    // 다른 buildingType에 대한 분기 추가 가능
    default:
      console.error("Unsupported building type:", buildingType);
      return [];
  }

  const geocodePromises = results.flatMap((result) => {
    // 옵셔널 체이닝을 사용해야, 네트워크가 느려질 시 데이터가 받아지지 않은 경우에도 데이터를 불러오지 않음
    const dataItems: IApartmentItem[] = result?.datas?.response?.body?.items?.item ?? [];

    return dataItems.map(async (item) => {
      const location = result.locatadd_nm;
      const dongMainCode = Number(item.법정동본번코드);
      const dongSubCode = Number(item.법정동부번코드);
      const filteredDongMainCode = dongMainCode !== 0 ? dongMainCode.toString() : "";
      // 부번이 없을 경우 부번이 존재하지 않고 주소에 합성되도록 하기 위해서
      const filteredDongSubCode = dongSubCode !== 0 ? `-${dongSubCode.toString()}` : "";
      const roadSubCode = Number(item.도로명건물부번호코드);
      const filteredRoadSubCode = roadSubCode !== 0 ? `-${roadSubCode.toString()}` : "";

      const itemDatas = {
        // streetNumber: item.지번,
        address: `${location} ${item.법정동.trim()} ${filteredDongMainCode}${filteredDongSubCode}`,
        address_road: `${location} ${item.도로명.trim()} ${Number(item.도로명건물본번호코드).toString()}${filteredRoadSubCode}`,
        buildingName: item.아파트,
        price: Number(item.거래금액.replace(/,/g, "")),
        area: item.전용면적,
        floor: item.층,
        dealYear: item.년,
        dealMonth: item.월,
        dealDay: item.일,
        constructionYear: item.건축년도,
      };

      const cacheKey = `geocode_${itemDatas.address}`;
      const cachedData = getCachedGeocodeData(cacheKey);
      if (cachedData !== undefined) {
        // console.log(`주소 ${address}에 대한 지오코딩 데이터 캐시 히트`);
        return cachedData;
      }

      try {
        const geocodeResult = await geocodeApi(itemDatas.address);
        if (geocodeResult !== null) {
          const result = {
            ...itemDatas,
            latitude: geocodeResult.latitude,
            longitude: geocodeResult.longitude,
            // roadAddress: geocodeResult.roadAddress,
            // jibunAddress: geocodeResult.jibunAddress,
          };

          setGeocodeCache(cacheKey, result);
          return result;
        } else {
          console.log(`allGeocodeData: 주소 ${itemDatas.address}에 대한 지오코딩 결과 없음`);
          return null;
        }
      } catch (error) {
        console.error(`Error geocoding address ${itemDatas.address}:`, error);
        return null;
      }
    });
  });

  const geocodeResults = (await Promise.all(geocodePromises)).filter((result): result is IGeocodeEtcData => result !== null);
  // 주소와 면적이 같은 경우 중복을 제거하고 하나만 선택합니다
  const uniqueGeocodeResults = geocodeResults.filter((result, index, self) => {
    if (result === null) {
      return false;
    }
    const key = `${result.address}_${result.area}_${result.floor}`;
    // 같은 주소와 면적과 층을 가진 데이터 중 첫 번째 데이터만 유지합니다
    return index === self.findIndex((t) => t !== null && `${t.address}_${t.area}_${t.floor}` === key);
  });

  return uniqueGeocodeResults;
};
