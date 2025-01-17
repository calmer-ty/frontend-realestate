import axios from "axios";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import type { IGeocodeAPI, IGeocode } from "@/src/commons/types";

// addressElements에서 특정 타입 값을 찾는 함수
const findElementByType = (elements: any[], type: string): string => {
  return elements.find((el) => el.types.includes(type))?.longName ?? "";
};

// 주소를 추출하는 함수
const extractAddress = (addressElements: string[]): { jibunAddress: string; roadAddress: string } => {
  const addressTypes: Record<string, string[]> = {
    // 지번 주소 조합: DONGMYUN + RI + LAND_NUMBER + BUILDING_NAME
    // 도로명 주소 조합: ROAD_NAME + BUILDING_NUMBER + BUILDING_NAME
    jibunAddress: ["SIDO", "SIGUGUN", "DONGMYUN", "RI", "LAND_NUMBER"],
    roadAddress: ["SIDO", "SIGUGUN", "ROAD_NAME", "BUILDING_NUMBER"],
  };

  const getAddress = (types: string[]): string =>
    types
      .map((type) => findElementByType(addressElements, type))
      .filter(Boolean)
      .join(" ");
  return {
    jibunAddress: getAddress(addressTypes.jibunAddress),
    roadAddress: getAddress(addressTypes.roadAddress),
  };
};

export const geocodeApi = async (address: string): Promise<IGeocode | null> => {
  const apiUrl = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;
  const response = await axios.get<IGeocodeAPI | undefined>(apiUrl, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NCP_CLIENT_ID,
      "X-NCP-APIGW-API-KEY": process.env.NCP_CLIENT_SECRET,
    },
  });
  const addresses = response.data?.addresses ?? [];
  try {
    if (addresses.length > 0) {
      const { x, y, addressElements } = addresses[0];

      // extractAddress 함수로 지번 주소와 도로명 주소를 가져옴
      const { jibunAddress, roadAddress } = addressElements !== undefined ? extractAddress(addressElements) : { jibunAddress: "", roadAddress: "" };
      // console.log("jibunAddress: ", jibunAddress);
      // console.log("roadAddress: ", roadAddress);

      return {
        latitude: parseFloat(y ?? DEFAULT_STRING_VALUE),
        longitude: parseFloat(x ?? DEFAULT_STRING_VALUE),
        jibunAddress,
        roadAddress,
      };
    } else {
      return null;
    }
  } catch (error) {
    handleError(error, "geocodeApi"); // 에러 처리
    return null;
  }
};
