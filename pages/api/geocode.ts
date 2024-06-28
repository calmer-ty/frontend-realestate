import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface GeocodeResponse {
  addresses: Array<{
    x: string; // 경도
    y: string; // 위도
  }>;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { addresses } = req.body;
  console.log("===== 지오코드 서버입니다 =====");

  try {
    const geocodeResults = await Promise.all(
      addresses.map(async (address: string) => {
        const apiUrl = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;

        const response = await axios.get<GeocodeResponse>(apiUrl, {
          headers: {
            "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NCP_CLIENT_ID,
            "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_NCP_CLIENT_SECRET,
          },
        });
        if (response.data.addresses.length > 0) {
          const { x, y } = response.data.addresses[0];
          return { latitude: parseFloat(y), longitude: parseFloat(x) };
        } else {
          return null;
        }
      }),
    );
    res.status(200).json(geocodeResults);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch geocode" });
  }
}
