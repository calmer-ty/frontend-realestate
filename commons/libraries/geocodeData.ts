import axios from "axios";
import NodeCache from "node-cache";
import { apartmentData } from "./apartmentData";
import type { IApartmentLocationData, IGeocodeCoord, IGeocodeData } from "../types";

const geocodeCache = new NodeCache({ stdTTL: 7200 });

export const geocodeData = async (): Promise<IGeocodeData[]> => {
  const apartmentInfos: IApartmentLocationData[] = await apartmentData();
  const geocodePromises = apartmentInfos.flatMap((result) => {
    console.log("resultresult", result);
    const items = result?.apartmentData?.response?.body?.items?.item ?? [];
    return items.map(async (item) => {
      const area = Math.round(item.전용면적 * 0.3025);
      const address = `${item.법정동} ${item.법정동본번코드} ${item.아파트}`;
      const amount = Math.round((Number(item.거래금액.replace(/,/g, "")) / 10000) * 10) / 10;
      const cacheKey = `geocode_${address}`;
      const locationName = result.locatadd_nm;

      // 캐시에서 데이터를 가져오거나 새로 요청하여 캐시에 저장합니다
      const cachedData = geocodeCache.get<{
        latitude: number;
        longitude: number;
      }>(cacheKey);

      if (cachedData !== undefined) {
        // console.log(`주소 ${address}에 대한 지오코딩 데이터 캐시 히트`);
        return {
          ...cachedData,
          address,
          amount,
          area,
          locationName,
        };
      }

      try {
        const apiUrl = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;
        const response = await axios.get<IGeocodeCoord>(apiUrl, {
          headers: {
            "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NCP_CLIENT_ID,
            "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_NCP_CLIENT_SECRET,
          },
        });

        if (response.data.addresses.length > 0) {
          const { x, y } = response.data.addresses[0];
          const geocodeResult = {
            latitude: parseFloat(y),
            longitude: parseFloat(x),
            address,
            amount,
            area,
          };

          // 데이터를 캐시에 저장합니다
          geocodeCache.set(cacheKey, geocodeResult);
          return geocodeResult;
        } else {
          // console.log(`주소 ${address}에 대한 지오코딩 결과 없음`);
          return null;
        }
      } catch (error) {
        console.error(`Error geocoding address ${address}:`, error);
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
    const key = `${result.address}_${result.area}`;
    // 같은 주소와 면적을 가진 데이터 중 첫 번째 데이터만 유지합니다
    return index === self.findIndex((t) => t !== null && `${t.address}_${t.area}` === key);
  });

  return uniqueGeocodeResults;
};
