import axios from "axios";
import { DEFAULT_STRING_VALUE } from "../../constants";
import type { IGeocodeCoord, IGeocode } from "@/src/commons/types";

export const geocodeApi = async (address: string): Promise<IGeocode> => {
  const apiUrl = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;
  const response = await axios.get<IGeocodeCoord>(apiUrl, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NCP_CLIENT_ID,
      "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_NCP_CLIENT_SECRET,
    },
  });
  const addresses = response.data.addresses ?? [];
  try {
    if (addresses.length > 0) {
      const { x, y, jibunAddress, roadAddress } = addresses[0];
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
    console.error(`지오코드 API 에러 메세지`, error);
    throw new Error("지역 Data 로딩 실패");
  }
};
