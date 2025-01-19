import { geocodeApi } from "./geocodeApi";
import { getCachedGeocodeData, setGeocodeCache } from "./geocodeCache";

import { getCachedApartmentData } from "@/src/commons/libraries/apartment/apartmentCache"; // 캐시 데이터 조회 함수 임포트
import { handleError } from "@/src/commons/libraries/utils/handleError";

import type { IApartmentItem, IFirestore, IGeocode } from "@/src/commons/types";

import pLimit from "p-limit";
import { DEFAULT_STRING_VALUE } from "../../constants";
import { getApartmentData } from "../apartment/apartmentData";
const limit = pLimit(10);

interface IGetAllGeocodeDataParams {
  buildingType: string;
  regionCode: string;
}
interface IGetAllGeocodeDataReturn {
  data: IApartmentItem;
  geocode: IGeocode | null;
}
interface IGetUserInputGeocodeDataParams {
  firestoreDatas: IFirestore[];
}

// 제외 필드 상수
// const FIELDS_TO_EXCLUDE = ["estateAgentSggNm", "jibun", "umdNm"]; // 제외할 필드들

// - 캐시가 있을 경우 해당 데이터를 반환하고, 없으면 API 요청 후 결과를 캐싱합니다.
const fetchGeocodeData = async (address: string): Promise<IGeocode | null> => {
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
export const getAllGeocodeData = async ({ buildingType, regionCode }: IGetAllGeocodeDataParams): Promise<IGetAllGeocodeDataReturn[]> => {
  const apartmentData = await getApartmentData(regionCode);
  const apartmentCache = getCachedApartmentData(`apartment_${regionCode}`);

  let selectedDatas: IApartmentItem[] = [];
  switch (buildingType) {
    case "apartment":
      // apartmentData가 있을 경우 사용하고, 없으면 캐시에서 가져옴
      if (apartmentCache !== undefined) {
        selectedDatas = apartmentCache; // 데이터가 있으면 그대로 사용
      } else if (apartmentData.length > 0) {
        selectedDatas = apartmentData; // 캐시가 있으면 캐시 데이터 사용
      } else {
        selectedDatas = []; // 데이터도 없고 캐시도 없으면 빈 배열 반환
        console.log("getAllGeocodeData / apartmentData가 없습니다. ");
      }

      break;
    // 다른 buildingType에 대한 분기 추가 가능
    default:
      console.error("찾을 수 없는 buildingType 입니다.:", buildingType);
      return [];
  }
  // console.log("apartmentCache", apartmentCache);

  const geocodeData = await Promise.all(
    selectedDatas.map((data) =>
      limit(async () => {
        try {
          const address = `${data.estateAgentSggNm} ${data.umdNm} ${data.jibun}`;
          const geocode = await fetchGeocodeData(address);

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

export const getUserInputGeocodeData = async ({ firestoreDatas }: IGetUserInputGeocodeDataParams): Promise<IGetAllGeocodeDataReturn[]> => {
  // 사용자 입력 주소를 기반으로 지오코딩 처리
  const geocodeData = await Promise.all(
    firestoreDatas.map((data) =>
      limit(async () => {
        try {
          const geocode = await fetchGeocodeData(data.address ?? DEFAULT_STRING_VALUE);
          return { data, geocode };
        } catch (error) {
          console.error(`Error processing user input geocode data`, error);
          return { data, geocode: null };
        }
      })
    )
  );

  return geocodeData.filter((item) => item.geocode !== null); // 유효한 데이터만 반환
};
