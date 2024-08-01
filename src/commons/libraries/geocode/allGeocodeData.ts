import { apartmentData } from "../apartment/apartmentData";
import type { IGeocodeData } from "@/src/commons/types";
import { geocodeApi } from "./geocodeApi";
import { getCachedGeocodeData, setGeocodeCache } from "./geocodeCache";

export const allGeocodeData = async (): Promise<IGeocodeData[]> => {
  const apartmentResults = await apartmentData();
  const geocodePromises = apartmentResults.flatMap((result) => {
    const apartmentDataItems = result?.apartmentData?.response?.body?.items?.item ?? [];
    return apartmentDataItems.map(async (item) => {
      // console.log("itemitemitem:::", item);
      const location = result.locatadd_nm;
      const dongSubCode = Number(item.법정동부번코드);
      const dongSubCodeStr = dongSubCode !== 0 ? `-${dongSubCode.toString()}` : "";
      const streetSubCode = Number(item.도로명건물부번호코드);
      const streetSubCodeStr = streetSubCode !== 0 ? `-${streetSubCode.toString()}` : "";

      const itemDatas = {
        streetNumber: item.지번,
        address: `${location} ${item.법정동.trim()} ${Number(item.법정동본번코드).toString()}${dongSubCodeStr}`,
        address_street: `${location} ${item.도로명.trim()} ${Number(item.도로명건물본번호코드).toString()}${streetSubCodeStr}`,
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
          };

          setGeocodeCache(cacheKey, result);
          return result;
        } else {
          console.log(`주소 ${itemDatas.address}에 대한 지오코딩 결과 없음`);
          return null;
        }
      } catch (error) {
        console.error(`Error geocoding address ${itemDatas.address}:`, error);
        return null;
      }
    });
  });

  const geocodeResults = (await Promise.all(geocodePromises)).filter((result): result is IGeocodeData => result !== null);
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
