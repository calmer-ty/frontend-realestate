import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import { getReduceCityName } from "@/src/commons/libraries/utils/convertCityName";
import type { IApartmentItem, IGeocodeData } from "@/src/commons/types";
interface IUseProcessedMarkerData {
  geocode: {
    jibunAddress: string;
    roadAddress: string;
    latitude?: number;
    longitude?: number;
  };
  data?: IApartmentItem;
}

// 단일 값을 처리하는 함수
export const useProcessedMarkerData = (markerData: IGeocodeData | null): IUseProcessedMarkerData | null => {
  if (markerData === null) {
    return null;
  }

  return {
    ...markerData,
    geocode: {
      ...markerData.geocode,
      jibunAddress: getReduceCityName(markerData.geocode?.jibunAddress ?? DEFAULT_STRING_VALUE),
      roadAddress: getReduceCityName(markerData.geocode?.roadAddress ?? DEFAULT_STRING_VALUE),
    },
  };
};

// 배열을 처리하는 함수
export const useProcessedMarkerDatas = (markerData: IGeocodeData[] | null): IUseProcessedMarkerData[] => {
  if (markerData === null) {
    return [];
  }

  return markerData.map((el) => ({
    ...el,
    geocode: {
      ...el.geocode,
      jibunAddress: getReduceCityName(el.geocode?.jibunAddress ?? DEFAULT_STRING_VALUE),
      roadAddress: getReduceCityName(el.geocode?.roadAddress ?? DEFAULT_STRING_VALUE),
    },
  }));
};
