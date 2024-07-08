import axios from "axios";
import NodeCache from "node-cache";
import { apartmentData } from "./apartmentData";
import type { IApartmentData, IGeocodeCoord, IGeocodeData } from "../types";

const geocodeCache = new NodeCache({ stdTTL: 7200 });

export const geocodeData = async (): Promise<IGeocodeData[]> => {
  const apartmentResults: IApartmentData[] = await apartmentData();
  const geocodePromises = apartmentResults.flatMap((result) => {
    const items = result?.response?.body?.items?.item ?? [];
    return items.map(async (item) => {
      const address = `${item.법정동} ${item.법정동본번코드} ${item.아파트}`;
      const amount = Number(item.거래금액.replace(/,/g, "")) / 10000;
      const cacheKey = `geocode_${address}`;

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
        };
      }

      try {
        const apiUrl = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
          address
        )}`;
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

  const geocodeResults = (await Promise.all(geocodePromises)).filter(
    (result): result is IGeocodeData => result !== null
  );
  return geocodeResults;
};
