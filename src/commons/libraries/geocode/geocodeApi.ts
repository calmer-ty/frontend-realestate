import axios from "axios";
import { DEFAULT_STRING_VALUE } from "../../constants";
import type { IGeocodeAPI, IGeocodeAPIReturn } from "@/src/commons/types";

// Helper function to find a specific address element by type
// const findElementByType = (elements: any[], type: string): string | null => {
//   const element = elements.find((el) => el.types.includes(type));
//   return element ? element.longName : null;
// };

export const geocodeApi = async (address: string): Promise<IGeocodeAPIReturn> => {
  const apiUrl = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;
  const response = await axios.get<IGeocodeAPI>(apiUrl, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NCP_CLIENT_ID,
      "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_NCP_CLIENT_SECRET,
    },
  });
  const addresses = response.data.addresses ?? [];
  console.log("geocodeApi addresses === ", addresses[0]);
  console.log("geocodeApi addressElements === ", addresses[0].addressElements);
  try {
    if (addresses.length > 0) {
      const { x, y, jibunAddress, roadAddress } = addresses[0];

      // Extract specific data based on types
      // const sido = findElementByType(addressElements, "SIDO") ?? "시/도 정보 없음";
      // const sigugun = findElementByType(addressElements, "SIGUGUN") ?? "시/군/구 정보 없음";
      // const dongMyun = findElementByType(addressElements, "DONGMYUN") ?? "법정동 정보 없음";
      // const jibun = findElementByType(addressElements, "JIBUN") ?? "지번 정보 없음";

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
