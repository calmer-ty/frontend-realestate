import { handleError } from "@/src/commons/libraries/utils/handleError";
import { geocodeApi } from "./geocodeApi";
import { getCachedGeocodeData, setGeocodeCache } from "./geocodeCache";
// import { getApartmentData } from "../apartment/apartmentData";
import { getBuildingData } from "../building/buildingData";
// import { getCachedApartmentData } from "../apartment/apartmentCache"; // 캐시 데이터 조회 함수 임포트
import { getCachedBuildingData } from "../building/buildingCache";

import type { IBuildingItem, IGeocode, IGeocodeDataParams } from "@/src/commons/types";

import pLimit from "p-limit";
const limit = pLimit(10);

interface IGetAllGeocodeDataReturn {
  data: IBuildingItem;
  geocode: IGeocode | null;
}
// interface IGetUserInputGeocodeDataParams {
//   firestoreDatas: IFirestore[];
// }

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
export const getAllGeocodeData = async ({ regionCode, buildingType }: IGeocodeDataParams): Promise<IGetAllGeocodeDataReturn[]> => {
  // const apartmentData = await getApartmentData(regionCode);
  // const apartmentCache = getCachedApartmentData(`apartment_${regionCode}`);

  const buildingData = await getBuildingData({ regionCode, regionName: "경기도 성남시 분당구", buildingType });
  const buildingCache = getCachedBuildingData(`${buildingType}_${regionCode}`);

  let selectedDatas: IBuildingItem[] = [];

  if (buildingCache !== undefined) {
    selectedDatas = buildingCache; // 데이터가 있으면 그대로 사용
  } else if (buildingData.length > 0) {
    selectedDatas = buildingData; // 캐시가 있으면 캐시 데이터 사용
  } else {
    selectedDatas = []; // 데이터도 없고 캐시도 없으면 빈 배열 반환
    console.log("getAllGeocodeData / buildingData가 없습니다. ");
  }

  const geocodeData = await Promise.all(
    selectedDatas.map((data) =>
      limit(async () => {
        try {
          const address = `${data.regionName} ${data.umdNm} ${data.jibun}`;
          const geocode = await fetchGeocodeData(address);

          return { data, geocode }; // 정상적으로 처리된 데이터 리턴
        } catch (error) {
          // 개별 요청에서 발생한 오류를 잡고, null로 처리하고 계속 진행
          console.error(`Error processing geocode data`, error);
          return { data, geocode: null }; // 기본값 리턴
        }
      })
    )
  );
  const filteredGeocodeData = geocodeData.filter((item) => item.geocode !== null);

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
