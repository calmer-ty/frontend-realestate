import { handleError } from "@/src/commons/libraries/utils/handleError";
import { geocodeApi } from "./geocodeApi";
import { getCachedGeocodeData, setGeocodeCache } from "./geocodeCache";
import { getBuildingData } from "../building/buildingData";
import { getCachedBuildingData } from "../building/buildingCache";

import type { IBuildingItem, IGeocode, IGeocodeDataParams } from "@/src/commons/types";

import pLimit from "p-limit";
const limit = pLimit(10);

interface IGetAllGeocodeDataReturn {
  data: IBuildingItem;
  geocode: IGeocode | undefined;
}

// 제외 필드 상수
// const FIELDS_TO_EXCLUDE = ["estateAgentSggNm", "jibun", "umdNm"]; // 제외할 필드들

// 캐시가 있을 경우 해당 데이터를 반환하고, 없으면 API 요청 후 결과를 캐싱합니다.
const fetchGeocodeData = async (address: string): Promise<IGeocode | undefined> => {
  const cacheKey = `geocode_${address}`;
  const cachedData = getCachedGeocodeData(cacheKey);

  if (cachedData !== undefined) {
    // console.log(`주소 ${itemDatas.address}에 대한 지오코딩 데이터 캐시 히트`);
    return cachedData;
  }

  try {
    const response = await geocodeApi(address);

    if (response === undefined) {
      return undefined; // null을 리턴하기 전에 로깅
    }
    // API 응답이 정상일 경우 캐시하고 반환
    setGeocodeCache(cacheKey, response);
    return response;
  } catch (error) {
    handleError(error, `fetchGeocodeData - ${address}`); // 에러 처리
    return undefined;
  }
};

// 전체 지오코딩 데이터를 가져오는 메인 함수

export const getAllGeocodeData = async ({ regionCode, regionName, buildingType }: IGeocodeDataParams): Promise<IGetAllGeocodeDataReturn[]> => {
  const buildingData = await getBuildingData({ regionCode, regionName, buildingType });
  const buildingCache = getCachedBuildingData(`${buildingType}_${regionCode}`);

  let selectedData: IBuildingItem[] = [];

  if (buildingCache !== undefined) {
    selectedData = buildingCache; // 데이터가 있으면 그대로 사용
  } else if (buildingData.length > 0) {
    selectedData = buildingData; // 캐시가 있으면 캐시 데이터 사용
  } else {
    selectedData = []; // 데이터도 없고 캐시도 없으면 빈 배열 반환
    console.log("getAllGeocodeData / buildingData가 없습니다. ");
  }

  const geocodeData = await Promise.all(
    selectedData.map((data) =>
      limit(async () => {
        try {
          const address = `${data.regionName} ${data.umdNm} ${data.jibun}`;
          const geocode = await fetchGeocodeData(address);

          return { data, geocode }; // 정상적으로 처리된 데이터 리턴
        } catch (error) {
          // 개별 요청에서 발생한 오류를 잡고, null로 처리하고 계속 진행
          console.error(`Error processing geocode data`, error);
          return { data, geocode: undefined }; // 기본값 리턴
        }
      })
    )
  );
  const filteredGeocodeData = geocodeData.filter((item) => item.geocode !== undefined);

  return filteredGeocodeData;
};

// export const getUserInputGeocodeData = async ({ firestoreDatas }: IGetUserInputGeocodeDataParams): Promise<IGetAllGeocodeDataReturn[]> => {
//   // 사용자 입력 주소를 기반으로 지오코딩 처리
//   const geocodeData = await Promise.all(
//     firestoreDatas.map((data) =>
//       limit(async () => {
//         try {
//           const geocode = await fetchGeocodeData(data.address ?? DEFAULT_STRING_VALUE);
//           return { data, geocode };
//         } catch (error) {
//           console.error(`Error processing user input geocode data`, error);
//           return { data, geocode: null };
//         }
//       })
//     )
//   );

//   return geocodeData.filter((item) => item.geocode !== null); // 유효한 데이터만 반환
// };
