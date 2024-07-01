import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import type { IApartmentData, IGeocodeCoord } from "@/commons/types";

// 예시: 아파트 정보를 가져오는 함수
const fetchApartmentData = async (): Promise<IApartmentData[]> => {
  try {
    const response = await axios.get<IApartmentData[]>(
      "http://localhost:3000/api/apartment"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching apartment data:", error);
    throw error;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  console.log("===== geocode handler =====");
  const apartmentData = await fetchApartmentData();

  const addressesSet = new Set<string>(); // 중복을 제거하기 위한 Set 객체 생성
  apartmentData.forEach((el) => {
    // geocode로 주소값 찾기
    el.response.body.items.item.forEach((el) => {
      console.log("apartmentData =>>>", el.거래금액);
      const address = `${el.법정동} ${el.법정동본번코드.replace(/^0+/g, "")}`;
      addressesSet.add(address);
    });
  });
  const uniqueAddresses = Array.from(addressesSet);

  try {
    // 지오코딩 API 호출
    const geocodeResults = await Promise.all(
      uniqueAddresses.map(async (address: string) => {
        try {
          const apiUrl = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
            address
          )}`;
          const response = await axios.get<IGeocodeCoord>(apiUrl, {
            headers: {
              "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NCP_CLIENT_ID,
              "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_NCP_CLIENT_SECRET,
            },
          });
          if (response.data.addresses.length > 0) {
            const { x, y } = response.data.addresses[0];
            return {
              latitude: parseFloat(y),
              longitude: parseFloat(x),
              // 좌표값 이외의 값들
              address,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error(`Error geocoding address ${address}:`, error);
          return null; // Geocode 실패 시 null 반환
        }
      })
    );
    const filteredResults = geocodeResults.filter((result) => result !== null);

    res.status(200).json(filteredResults);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}
