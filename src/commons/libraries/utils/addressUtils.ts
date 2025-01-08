import { getFullCityName } from "@/src/commons/libraries/utils/convertCityName";

import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import type { IGeocodeData } from "@/src/commons/types";

export const getJibunAddress = (geocodeData: IGeocodeData): string => {
  return `${getFullCityName(geocodeData.data?.estateAgentSggNm ?? DEFAULT_STRING_VALUE)} ${geocodeData.data?.umdNm ?? DEFAULT_STRING_VALUE} ${geocodeData.data?.jibun ?? DEFAULT_STRING_VALUE}`;
};
