import axios from "axios";
import { DEFAULT_STRING_VALUE } from "../../constants";
import type { IGeocodeCoord, IGeocode } from "@/src/commons/types";

export const geocodeApi = async (address: string): Promise<IGeocode | null> => {
  try {
    const apiUrl = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;
    const response = await axios.get<IGeocodeCoord>(apiUrl, {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NCP_CLIENT_ID,
        "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_NCP_CLIENT_SECRET,
      },
    });

    const addresses = response.data.addresses ?? [];
    if (addresses.length > 0) {
      const { x, y } = addresses[0];
      return {
        latitude: parseFloat(y ?? DEFAULT_STRING_VALUE),
        longitude: parseFloat(x ?? DEFAULT_STRING_VALUE),
        // roadAddress
        // jibunAddress
      };
    } else {
      console.log(`geocodeApi: 주소 ${address}에 대한 지오코딩 결과 없음`);
      return null;
    }
  } catch (error) {
    console.error(`Error geocoding address ${address}:`, error);
    return null;
  }
};
