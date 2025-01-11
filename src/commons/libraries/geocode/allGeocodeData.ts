import { getApartmentData } from "../apartment/apartmentData";
import { geocodeApi } from "./geocodeApi";
import { getCachedGeocodeData, setGeocodeCache } from "./geocodeCache";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import type { IApartmentItem, IGeocodeAPIReturn } from "@/src/commons/types";

import pLimit from "p-limit";
const limit = pLimit(10);

// 제외 필드 상수
// const FIELDS_TO_EXCLUDE = ["estateAgentSggNm", "jibun", "umdNm"]; // 제외할 필드들

// - 캐시가 있을 경우 해당 데이터를 반환하고, 없으면 API 요청 후 결과를 캐싱합니다.
const fetchGeocodeData = async (address: string): Promise<IGeocodeAPIReturn | null> => {
  const cacheKey = `geocode_${address}`;
  const cachedData = getCachedGeocodeData(cacheKey);

  if (cachedData !== undefined) {
    // console.log(`주소 ${itemDatas.address}에 대한 지오코딩 데이터 캐시 히트`);
    return cachedData;
  }

  try {
    const response = await geocodeApi(address);

    if (response === null) {
      return null; // null을 리턴하기 전에 로깅
    }
    // API 응답이 정상일 경우 캐시하고 반환
    setGeocodeCache(cacheKey, response);
    return response;
  } catch (error) {
    handleError(error, `fetchGeocodeData - ${address}`); // 에러 처리
    return null;
  }
};

// 전체 지오코딩 데이터를 가져오는 메인 함수
// - 지정된 건물 유형의 데이터를 가져와 지오코딩하고, 중복 데이터를 제거합니다.
export const getAllGeocodeData = async (buildingType: string): Promise<Array<{ data: IApartmentItem; geocode: IGeocodeAPIReturn | null }>> => {
  // 주거 타입 선택
  let selectedData: IApartmentItem[] = [];
  switch (buildingType) {
    case "apartment":
      selectedData = await getApartmentData();
      break;
    // 다른 buildingType에 대한 분기 추가 가능
    default:
      console.error("찾을 수 없는 buildingType 입니다.:", buildingType);
      return [];
  }

  const geocodeData = await Promise.all(
    selectedData.map((dataItem) =>
      limit(async () => {
        try {
          const address = `${dataItem.estateAgentSggNm} ${dataItem.umdNm} ${dataItem.jibun}`;
          const geocode = await fetchGeocodeData(address);

          // 데이터를 필터링하여 새로운 객체에 저장
          // const filteredData: Partial<IApartmentItem> = {};

          // Object.keys(dataItem).forEach((key) => {
          //   if (!FIELDS_TO_EXCLUDE.includes(key)) {
          //     filteredData[key] = dataItem[key];
          //   }
          // });
          const data = dataItem;
          return { data, geocode }; // 정상적으로 처리된 데이터 리턴
        } catch (error) {
          // 개별 요청에서 발생한 오류를 잡고, null로 처리하고 계속 진행
          console.error(`Error processing geocode data`, error);
          return { data: {}, geocode: null }; // 기본값 리턴
        }
      })
    )
  );
  const filteredGeocodeData = geocodeData.filter((item) => item.geocode !== null);
  return filteredGeocodeData;
};
