// import { apartmentApi } from "./apartmentApi";
// import { getCachedApartmentData, setApartmentCache } from "./apartmentCache";
// import { handleError } from "@/src/commons/libraries/utils/handleError";

// import type { IApartmentItem } from "@/src/commons/types";

// export const getApartmentData = async (regionCode: string): Promise<IApartmentItem[]> => {
//   if (regionCode === "") {
//     console.warn("regionCode is undefined, skipping API call");
//     return []; // regionCode가 없으면 빈 배열 반환
//   }

//   const cacheKey = `apartment_${regionCode}`;
//   const cachedData = getCachedApartmentData(cacheKey);

//   if (cachedData !== undefined) {
//     return cachedData; // 캐시가 있으면 캐시 데이터 반환
//   }

//   try {
//     const response = await apartmentApi(regionCode);
//     setApartmentCache(cacheKey, response);
//     // console.log("API 데이터 캐시 저장 결과: ", response);

//     return response;
//   } catch (error) {
//     handleError(error, `getApartmentData - ${regionCode}`);
//     return []; // 에러가 발생하면 빈 배열 반환
//   }
// };
