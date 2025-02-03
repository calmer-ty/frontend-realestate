import { getFullCityName } from "@/src/commons/libraries/utils/convertCityName";

import type { IGeocodeData } from "@/src/commons/types";

export const getJibunAddress = (geocodeData: IGeocodeData): string => {
  return `${getFullCityName(geocodeData.data?.estateAgentSggNm)} ${geocodeData?.data?.umdNm} ${geocodeData?.data?.jibun}`;
};
