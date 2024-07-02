import axios from "axios";
import type {
  IApartmentData,
  IApartmentItem,
  IReginCdData,
} from "@/commons/types";
import type { NextApiRequest, NextApiResponse } from "next";

// 메모리 내 캐시 객체
const regionDataCache: Record<string, IReginCdData> = {};
const apartmentDataCache: Record<string, IApartmentData[]> = {};

// 지역정보 API에서 조회할 도시 목록
const cities = [
  "서울특별시",
  "경기도",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "경상북도",
  "경상남도",
  "전라남도",
  "충청북도",
  "충청남도",
  "경상남도",
];

console.log("===== 오류를 찾아라 =====");
// 지역 정보에서 지역 코드를 추출하는 함수
const getRegionIds = (regionData: IReginCdData): string[] => {
  // regionData에서 지역 코드만 추출하여 배열로 반환
  const regionIds = regionData.StanReginCd[1].row.map((el) =>
    el.region_cd.replace(/.{5}$/, "")
  );
  return Array.from(new Set(regionIds)); // 중복 제거 후 배열로 변환
};

// 지역정보 API를 호출하여 데이터를 가져오는 함수
const fetchRegionData = async (city: string): Promise<IReginCdData> => {
  try {
    const reginCdKey = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
    const reginCdUrl = `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?ServiceKey=${reginCdKey}&type=json&pageNo=1&numOfRows=10&flag=Y&locatadd_nm=${encodeURIComponent(
      city
    )}`;

    const cacheKey = `region_${city}`;
    if (regionDataCache[cacheKey] !== undefined) {
      return regionDataCache[cacheKey];
    }

    // 캐시에서 데이터를 찾고, 없으면 API 호출하여 데이터를 캐시에 저장
    // if (regionDataCache[reginCdUrl] === undefined) {
    //   const response = await axios.get(reginCdUrl);
    //   regionDataCache[reginCdUrl] = response.data;
    // }

    const response = await axios.get(reginCdUrl);
    const regionData: IReginCdData = response.data;
    regionDataCache[cacheKey] = regionData;

    return regionData;
  } catch (error) {
    console.error(`Failed to fetch region data for ${city}:`, error);
    throw new Error(`Failed to fetch region data for ${city}`);
  }
};

// 특정 지역의 아파트 정보를 가져오는 함수
const fetchApartmentData = async (
  regionId: string
): Promise<IApartmentData[]> => {
  try {
    const apartmentKey = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
    const apartmentUrl = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?&LAWD_CD=${regionId}&DEAL_YMD=201512&serviceKey=${apartmentKey}`;

    const cacheKey = `apartment_${regionId}`;
    if (apartmentDataCache[cacheKey] !== undefined) {
      return apartmentDataCache[cacheKey];
    }

    // // 캐시에서 데이터를 찾고, 없으면 API 호출하여 데이터를 캐시에 저장
    // if (apartmentDataCache[apartmentUrl] === undefined) {
    //   const response = await axios.get(apartmentUrl);
    //   const totalCount: number = response.data.response.body.totalCount;
    //   const numOfRows = Math.min(totalCount, 20); // 최대 20개까지만 요청하도록 설정

    //   // 새로운 URL에 numOfRows를 추가하여 다시 요청
    //   const limitedUrl = `${apartmentUrl}&numOfRows=${numOfRows}`;
    //   const limitedResponse = await axios.get(limitedUrl);

    //   apartmentDataCache[apartmentUrl] = limitedResponse.data;
    // }

    const response = await axios.get(apartmentUrl);
    const totalCount: number = response.data.response.body.totalCount;
    const numOfRows = Math.min(totalCount, 20); // 최대 20개까지만 요청하도록 설정

    const limitedUrl = `${apartmentUrl}&numOfRows=${numOfRows}`;
    const limitedResponse = await axios.get(limitedUrl);

    // const apartmentData: IApartmentData[] = limitedResponse.data;
    // apartmentDataCache[cacheKey] = apartmentData;
    const apartmentData: IApartmentData[] =
      limitedResponse.data.response.body.items.item.map(
        (item: IApartmentItem) => ({
          ...item,
        })
      );
    apartmentDataCache[cacheKey] = apartmentData;

    return apartmentData;
  } catch (error) {
    throw new Error("Failed to fetch apartment data");
  }
};

// Next.js API 라우트 핸들러 함수 정의
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    // 병렬로 각 도시의 지역 정보 데이터 가져오기
    const regionRequests = cities.map((city) => fetchRegionData(city));
    const regionDataArray = await Promise.all(regionRequests);

    // 각 도시의 지역 코드 추출 후 객체로 변환
    // const regionIdsObject: Record<string, string[]> = {};
    // cities.forEach((city, index) => {
    //   const regionData = regionDataArray[index];
    //   regionIdsObject[city] = getRegionIds(regionData);
    // });
    const regionIdsObject: Record<string, string[]> = {};
    regionDataArray.forEach((regionData, index) => {
      const city = cities[index];
      regionIdsObject[city] = getRegionIds(regionData);
    });

    // 병렬로 각 지역의 아파트 정보 데이터 가져오기
    // const apartmentRequests = Object.values(regionIdsObject)
    //   .flat()
    //   .map((regionId) => fetchApartmentDataForRegion(regionId));

    // const apartmentData = await Promise.all(apartmentRequests);
    const apartmentRequests = cities.map((city) => {
      const regionIds = regionIdsObject[city];
      return regionIds.map((regionId) => fetchApartmentData(regionId));
    });
    const apartmentData = await Promise.all(apartmentRequests.flat());
    res.status(200).json({ regionIdsObject, apartmentData }); // JSON 형태로 아파트 정보 데이터 전송
  } catch (error) {
    res.status(500).json({ error: "Error fetching apartmentData" }); // 오류 발생 시 500 상태 코드와 오류 메시지 응답
  }
}
