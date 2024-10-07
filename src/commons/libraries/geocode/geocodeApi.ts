import axios from "axios";
import type { IGeocodeCoord, IGeocodeData } from "@/src/commons/types";

export const geocodeApi = async (address: string): Promise<IGeocodeData | null> => {
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
        latitude: parseFloat(y ?? "값 없음"),
        longitude: parseFloat(x ?? "값 없음"),
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
