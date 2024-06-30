import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface GeocodeResponse {
  latitude: number; // 위도
  longitude: number; // 경도
}
interface NaverGeocodeResponse {
  addresses: Array<{
    x: string; // 경도
    y: string; // 위도
  }>;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { address } = req.query;
  const apiUrl = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
    address as string,
  )}`;

  try {
    const response = await axios.get<NaverGeocodeResponse>(apiUrl, {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NCP_CLIENT_ID,
        "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_NCP_CLIENT_SECRET,
      },
    });

    if (response.data.addresses.length > 0) {
      const { x, y } = response.data.addresses[0];
      const geocodeResponse: GeocodeResponse = {
        latitude: parseFloat(y),
        longitude: parseFloat(x),
      };
      res.status(200).json(geocodeResponse);
    } else {
      res.status(404).json({ error: "Address not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch geocode" });
  }
}
