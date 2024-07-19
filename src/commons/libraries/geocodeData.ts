import axios from "axios";
import NodeCache from "node-cache";
import { apartmentData } from "./apartmentData";
import type { IApartmentLocationData, IGeocodeCoord, IGeocodeData } from "@/src/types";

const geocodeCache = new NodeCache({ stdTTL: 7200 });

export const geocodeData = async (): Promise<IGeocodeData[]> => {
  const apartmentResults: IApartmentLocationData[] = await apartmentData();
  const geocodePromises = apartmentResults.flatMap((result) => {
    const apartmentDataItems = result?.apartmentData?.response?.body?.items?.item ?? [];
    return apartmentDataItems.map(async (item) => {
      // console.log("itemitemitem:::", item);
      const location = result.locatadd_nm;
      const dongSubCode = Number(item.법정동부번코드);
      const dongSubCodeStr = dongSubCode !== 0 ? `-${dongSubCode.toString()}` : "";
      const streetSubCode = Number(item.도로명건물부번호코드);
      const streetSubCodeStr = streetSubCode !== 0 ? `-${streetSubCode.toString()}` : "";

      const itemsData = {
        streetNumber: item.지번,
        address: `${location} ${item.법정동.trim()} ${Number(item.법정동본번코드).toString()}${dongSubCodeStr}`,
        address_street: `${location} ${item.도로명.trim()} ${Number(item.도로명건물본번호코드).toString()}${streetSubCodeStr}`,
        apartmentName: item.아파트,
        amount: Number(item.거래금액.replace(/,/g, "")),
        area: item.전용면적,
        floor: item.층,
        dealYear: item.년,
        dealMonth: item.월,
        dealDay: item.일,
        constructionYear: item.건축년도,
      };
      const cacheKey = `geocode_${itemsData.address}`;

      // 캐시에서 데이터를 가져오거나 새로 요청하여 캐시에 저장합니다
      const cacheData = itemsData;
      const cachedData = geocodeCache.get<IGeocodeData>(cacheKey);

      if (cachedData !== undefined) {
        // console.log(`주소 ${address}에 대한 지오코딩 데이터 캐시 히트`);
        return cachedData;
      }

      try {
        const apiUrl = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(itemsData.address)}`;
        const response = await axios.get<IGeocodeCoord>(apiUrl, {
          headers: {
            "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NCP_CLIENT_ID,
            "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_NCP_CLIENT_SECRET,
          },
        });

        if (response.data.addresses.length > 0) {
          const { x, y } = response.data.addresses[0];
          const geocodeResult = {
            ...cacheData,
            latitude: parseFloat(y),
            longitude: parseFloat(x),
          };

          // 데이터를 캐시에 저장합니다
          geocodeCache.set(cacheKey, geocodeResult);
          return geocodeResult;
        } else {
          console.log(`주소 ${itemsData.address}에 대한 지오코딩 결과 없음`);
          return null;
        }
      } catch (error) {
        console.error(`Error geocoding address ${itemsData.address}:`, error);
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
