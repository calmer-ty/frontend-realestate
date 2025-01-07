import { getApartmentData } from "../apartment/apartmentData";
import { geocodeApi } from "./geocodeApi";
import { getCachedGeocodeData, setGeocodeCache } from "./geocodeCache";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import type { IApartmentItem, IGeocodeAPIReturn } from "@/src/commons/types";

import pLimit from "p-limit";
import { logToFile } from "../utils/logToFile";
const limit = pLimit(10);

// 제외 필드 상수
const FIELDS_TO_EXCLUDE = ["estateAgentSggNm", "jibun", "umdNm"]; // 제외할 필드들

// - 캐시가 있을 경우 해당 데이터를 반환하고, 없으면 API 요청 후 결과를 캐싱합니다.
const fetchGeocodeData = async (address: string): Promise<IGeocodeAPIReturn | null> => {
  const cacheKey = `geocode_${address}`;
  const cachedData = getCachedGeocodeData(cacheKey);

  if (cachedData !== undefined) {
    // console.log(`주소 ${itemDatas.address}에 대한 지오코딩 데이터 캐시 히트`);
    return cachedData;
  }

  try {
    const response = await geocodeApi(address ?? DEFAULT_STRING_VALUE);
    // console.log("responses",response?.jibunAddress)

    if (response != null) {
      setGeocodeCache(cacheKey, response);
      return response;
    } else {
      return null;
    }
  } catch (error) {
    handleError(error, `fetchGeocodeData - ${address}`); // 에러 처리
    return null;
  }
};

// 전체 지오코딩 데이터를 가져오는 메인 함수
// - 지정된 건물 유형의 데이터를 가져와 지오코딩하고, 중복 데이터를 제거합니다.
export const getAllGeocodeData = async (
  buildingType: string
): Promise<
  Array<{
    data: IApartmentItem;
    geocode: IGeocodeAPIReturn | null;
  }>
> => {
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
          const filteredData: Partial<IApartmentItem> = {};

          Object.keys(dataItem).forEach((key) => {
            if (!FIELDS_TO_EXCLUDE.includes(key)) {
              filteredData[key] = dataItem[key];
            }
          });
          const data = filteredData;
          return { data, geocode }; // 정상적으로 처리된 데이터 리턴
        } catch (error) {
          // 개별 요청에서 발생한 오류를 잡고, null로 처리하고 계속 진행
          console.error(`Error processing geocode data`, error);
          return { data: {}, geocode: null }; // 기본값 리턴
        }
      })
    )
  );

  // geocodeData에서 중복 체크 및 undefined/null 체크를 위한 함수
  const checkForDuplicatesAndUndefined = (data: Array<{ data: IApartmentItem; geocode: IGeocodeAPIReturn | null }>): any => {
    const seen = new Set<string>(); // 이미 확인한 항목들을 저장할 Set
    const duplicates: Array<{ data: IApartmentItem; geocode: IGeocodeAPIReturn | null }> = [];
    const undefinedEntries: Array<{ data: IApartmentItem; geocode: IGeocodeAPIReturn | null }> = [];

    data.forEach((item) => {
      // geocode 또는 data에서 특정 값을 기준으로 중복 체크
      const uniqueKey = `${item.data.umdNm}_${item.data.jibun}_${item.data.aptNm}_${item.geocode?.jibunAddress}`;

      if (item.data == null || item.geocode == null) {
        // data 또는 geocode가 undefined/null인 경우 undefinedEntries에 추가
        undefinedEntries.push(item);
      } else if (seen.has(uniqueKey)) {
        // 중복된 항목이 있으면 duplicates 배열에 추가
        duplicates.push(item);
      } else {
        seen.add(uniqueKey);
      }
    });

    return { duplicates, undefinedEntries };
  };

  // geocodeData에서 중복과 undefined/null 체크
  const { duplicates, undefinedEntries } = checkForDuplicatesAndUndefined(geocodeData);

  if (duplicates.length > 0) {
    console.log("중복되는 데이터가 있습니다:");
    logToFile(duplicates);
  } else {
    console.log("중복되는 데이터가 없습니다.");
  }

  if (undefinedEntries.length > 0) {
    console.log("undefined 또는 null 값이 있는 항목:");
    logToFile(undefinedEntries);
  } else {
    console.log("undefined 또는 null 값이 없습니다.");
  }
  return geocodeData;
};
