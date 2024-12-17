import axios from "axios";
import { DEFAULT_STRING_VALUE } from "../../constants";
import type { IGeocodeAPI, IGeocodeAPIReturn } from "@/src/commons/types";

// addressElements에서 특정 타입 값을 찾는 함수
const findElementByType = (elements: any[], type: string): string => {
  return elements.find((el) => el.types.includes(type))?.longName ?? "";
};

// 주소를 추출하는 함수
// prettier-ignore
const extractAddress = (addressElements: string[]): { jibunAddress: string; roadAddress: string; } => {
  // 지번 주소 조합: RI + LAND_NUMBER + BUILDING_NAME
  const jibunAddress = [
    findElementByType(addressElements, "SIDO"),
    findElementByType(addressElements, "SIGUGUN"),
    findElementByType(addressElements, "DONGMYUN"),
    findElementByType(addressElements, "RI"),
    findElementByType(addressElements, "LAND_NUMBER"),
    // findElementByType(addressElements, "BUILDING_NAME"),
  ]
    .filter(Boolean) // 값이 비어있으면 제외
    .join(" ");

  // 도로명 주소 조합: ROAD_NAME + BUILDING_NUMBER + BUILDING_NAME
  const roadAddress = [
    findElementByType(addressElements, "SIDO"),
    findElementByType(addressElements, "SIGUGUN"),
    findElementByType(addressElements, "DONGMYUN"),
    findElementByType(addressElements, "ROAD_NAME"),
    findElementByType(addressElements, "BUILDING_NUMBER"),
    // findElementByType(addressElements, "BUILDING_NAME"),
  ]
    .filter(Boolean)
    .join(" ");

  return { jibunAddress, roadAddress };
};

export const geocodeApi = async (address: string): Promise<IGeocodeAPIReturn> => {
  const apiUrl = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;
  const response = await axios.get<IGeocodeAPI>(apiUrl, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NCP_CLIENT_ID,
      "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_NCP_CLIENT_SECRET,
    },
  });
  const addresses = response.data.addresses ?? [];
  try {
    if (addresses.length > 0) {
      const { x, y, addressElements } = addresses[0];
      // console.log("addressElements === ", jibunAddress, roadAddress, addressElements);

      // extractAddress 함수로 지번 주소와 도로명 주소를 가져옴

      const { jibunAddress, roadAddress } = addressElements !== undefined ? extractAddress(addressElements) : { jibunAddress: "", roadAddress: "" };

      return {
        latitude: parseFloat(y ?? DEFAULT_STRING_VALUE),
        longitude: parseFloat(x ?? DEFAULT_STRING_VALUE),
        jibunAddress,
        roadAddress,
      };
    } else {
      throw new Error(`${address}, 파라미터 값을 가져오는 데 실패했습니다.`);
    }
  } catch (error) {
    throw new Error("지역 API 로딩 실패");
  }
};
