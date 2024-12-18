import { getApartmentData } from "../apartment/apartmentData";
import { geocodeApi } from "./geocodeApi";
import { getCachedGeocodeData, setGeocodeCache } from "./geocodeCache";
import { DEFAULT_STRING_VALUE } from "../../constants";
import type { IApartmentItem, IGeocodeAPIReturn } from "@/src/commons/types";

// import pLimit from "p-limit";
// const limit = pLimit(100);

// 캐시를 확인한 후 지오코딩을 수행하는 함수
// - 캐시가 있을 경우 해당 데이터를 반환하고, 없으면 API 요청 후 결과를 캐싱합니다.
const fetchGeocodeData = async (address: string): Promise<IGeocodeAPIReturn | null> => {
  const cacheKey = `geocode_${address}`;
  const cachedData = getCachedGeocodeData(cacheKey);

  if (cachedData !== undefined) {
    // console.log(`주소 ${itemDatas.address}에 대한 지오코딩 데이터 캐시 히트`);
    return cachedData;
  }

  try {
    const responses = await geocodeApi(address ?? DEFAULT_STRING_VALUE);
    if (responses != null) {
      // const addresses = {
      //   latitude: responses.latitude,
      //   longitude: responses.longitude,
      // };

      setGeocodeCache(cacheKey, responses);
      return responses;
    } else {
      return null;
    }
  } catch (error) {
    console.log(`${address}에 대한 지오코드 결과 없음, catch`);
    return null;
  }
};

// 전체 지오코딩 데이터를 가져오는 메인 함수
// - 지정된 건물 유형의 데이터를 가져와 지오코딩하고, 중복 데이터를 제거합니다.
export const getAllGeocodeData = async (buildingType: string): Promise<Array<{ data: IApartmentItem; geocode: IGeocodeAPIReturn | null }>> => {
  // 주거 타입 선택
  let datas: IApartmentItem[] = [];
  switch (buildingType) {
    case "apartment":
      datas = await getApartmentData();
      break;
    // 다른 buildingType에 대한 분기 추가 가능
    default:
      console.error("찾을 수 없는 buildingType 입니다.:", buildingType);
      return [];
  }

  const geocodeData = await Promise.all(
    datas.map(async (data) =>
      // limit(async () => {
      //   const address = `${data.estateAgentSggNm} ${data.umdNm} ${data.jibun}`;
      //   const geocode = await fetchGeocodeData(address);

      //   return { data, geocode };
      // })
      {
        const address = `${data.estateAgentSggNm} ${data.umdNm} ${data.jibun}`;
        const geocode = await fetchGeocodeData(address);

        return { data, geocode };
      }
    )
  );

  return geocodeData;
};
