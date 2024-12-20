import { geocodeApi } from "./geocodeApi";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import type { IGeocodeAPIReturn } from "@/src/commons/types";

export const getSelectGeocodeData = async (address: string): Promise<IGeocodeAPIReturn | null> => {
  try {
    const geocodeResult = await geocodeApi(address);
    if (geocodeResult !== null) {
      const result = geocodeResult;

      return result;
    } else {
      console.log(`selectGeocodeData: 주소 ${address}에 대한 지오코딩 결과 없음`);
      return null;
    }
  } catch (error) {
    handleError(error, "getSelectGeocodeData"); // 에러 처리
    return null;
  }
};
