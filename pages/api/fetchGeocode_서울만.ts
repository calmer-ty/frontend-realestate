import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import type { IApartmentData, IGeocodeCoord, IGeocodeData } from "@/src/commons/types";
import NodeCache from "node-cache";

// 메모리 내 캐시 객체 생성
const cache = new NodeCache({ stdTTL: 3600 }); // 1시간 TTL 설정

// 아파트 정보를 가져오는 비동기 함수 정의
const fetchApartmentData = async (): Promise<IApartmentData[]> => {
  try {
    const response = await axios.get<IApartmentData[]>("http://localhost:3000/api/apartment");
    return response.data; // 아파트 데이터 반환
  } catch (error) {
    console.error("Error fetching apartment data:", error);
    throw error;
  }
};

// 주소를 받아와 지오코딩 정보를 반환하는 비동기 함수 정의
const fetchGeocode = async (address: string): Promise<IGeocodeData | null> => {
  const apiUrl = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;
  try {
    // 캐시에서 데이터 조회
    const cachedData = cache.get(address);
    if (cachedData !== undefined) {
      console.log(`Cache hit for ${address}`);
      return cachedData as IGeocodeData;
    }

    const response = await axios.get<IGeocodeCoord>(apiUrl, {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NCP_CLIENT_ID,
        "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_NCP_CLIENT_SECRET,
      },
    });
    if (response.data.addresses.length > 0) {
      const { x, y } = response.data.addresses[0];

      // 거래금액 초기값 설정
      let amount = 0;
      let buildingName = "-";

      // 아파트 데이터에서 거래금액 추출
      const apartmentData = await fetchApartmentData();
      apartmentData.forEach((apartment) => {
        apartment.response.body.items.item.forEach((item) => {
          const itemAddress = `${item.법정동} ${item.법정동본번코드.replace(/^0+/g, "")}`;

          // 주소가 일치하는 경우 거래금액을 할당
          if (itemAddress === address) {
            amount = Number(item.거래금액.split(",").join("")) / 10000;
            console.log("amount", amount);
            buildingName = item.아파트;
          }
        });
      });

      const geocodeResult = {
        latitude: parseFloat(y),
        longitude: parseFloat(x),
        address,
        amount,
        buildingName,
      };

      // 데이터를 캐시에 저장 (예: 1시간 동안 유지)
      cache.set(address, geocodeResult, 7200);

      return geocodeResult;
    } else {
      return null; // 주소에 대한 지오코딩 결과 없음
    }
  } catch (error) {
    console.error(`Error geocoding address ${address}:`, error);
    return null; // 지오코딩 요청 실패
  }
};

// Next.js API route 핸들러 정의
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  console.log("===== geocode handler =====");
  try {
    // 아파트 데이터 불러오기
    const apartmentData = await fetchApartmentData();

    const addressesSet = new Set<string>(); // 중복을 제거하기 위한 Set 객체 생성
    // 아파트 데이터에서 주소 추출하여 중복 제거 후 배열로 변환
    apartmentData.forEach((apartment) => {
      apartment.response.body.items.item.forEach((item) => {
        const address = `${item.법정동} ${item.법정동본번코드.replace(/^0+/g, "")}`;
        addressesSet.add(address);
      });
    });

    const uniqueAddresses = Array.from(addressesSet); // 중복 제거된 주소 배열 생성

    // 주소 배열을 이용하여 지오코딩 API를 병렬로 호출하여 결과 수집
    const geocodeResults = await Promise.all(uniqueAddresses.map((address: string) => fetchGeocode(address)));

    // null이 아닌 지오코딩 결과만 필터링
    const filteredResults = geocodeResults.filter((result) => result !== null);

    // 콘솔에 filteredResults 출력
    // console.log("Filtered results:", filteredResults);

    // 클라이언트에 필터링된 지오코딩 결과 반환
    res.status(200).json(filteredResults);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}
