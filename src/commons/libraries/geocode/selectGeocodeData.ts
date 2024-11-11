import { geocodeApi } from "./geocodeApi";
import type { IGeocode } from "@/src/commons/types";

export const getSelectGeocodeData = async (address: string): Promise<IGeocode | null> => {
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
    console.error(`Error geocoding address ${address}:`, error);
    return null;
  }
};
