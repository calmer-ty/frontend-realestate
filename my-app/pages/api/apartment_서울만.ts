import axios from "axios";
import type { IApartmentData, IRegionData } from "@/commons/types";
import type { NextApiRequest, NextApiResponse } from "next";

// 메모리 내 캐시 객체
const regionDataCache: Record<string, IReginData> = {};
const apartmentDataCache: Record<string, IApartmentData[]> = {};

// 지역정보 API에서 조회할 도시 목록
const citys = [
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

// 지역 정보에서 지역 코드를 추출하는 함수
const getRegionIds = (regionData: IReginData): string[] => {
  // regionData에서 지역 코드만 추출하여 배열로 반환
  const regionIds: string[] = regionData.StanReginCd[1].row.map((el: any) =>
    el.region_cd.replace(/.{5}$/, "")
  );
  return Array.from(new Set(regionIds)); // 중복 제거 후 배열로 변환
};

// 지역정보 API를 호출하여 데이터를 가져오는 함수
const fetchRegionData = async (): Promise<IReginData> => {
  try {
    const reginCdKey = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
    const reginCdUrl = `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?ServiceKey=${reginCdKey}&type=json&pageNo=1&numOfRows=10&flag=Y&locatadd_nm=${citys[0]}`;

    // 캐시에서 데이터를 찾고, 없으면 API 호출하여 데이터를 캐시에 저장
    if (regionDataCache[reginCdUrl] === undefined) {
      const response = await axios.get(reginCdUrl);
      regionDataCache[reginCdUrl] = response.data;
    }

    return regionDataCache[reginCdUrl];
  } catch (error) {
    throw new Error("Failed to fetch region codes");
  }
};

// 특정 지역의 아파트 정보를 가져오는 함수
const fetchApartmentDataForRegion = async (
  regionId: string
): Promise<IApartmentData[]> => {
  try {
    const apartmentKey = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
    const apartmentUrl = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?&LAWD_CD=${regionId}&DEAL_YMD=201512&serviceKey=${apartmentKey}`;

    // 캐시에서 데이터를 찾고, 없으면 API 호출하여 데이터를 캐시에 저장
    if (apartmentDataCache[apartmentUrl] === undefined) {
      const response = await axios.get(apartmentUrl);
      const totalCount: number = response.data.response.body.totalCount;
      const numOfRows = Math.min(totalCount, 20); // 최대 20개까지만 요청하도록 설정

      // 새로운 URL에 numOfRows를 추가하여 다시 요청
      const limitedUrl = `${apartmentUrl}&numOfRows=${numOfRows}`;
      const limitedResponse = await axios.get(limitedUrl);

      apartmentDataCache[apartmentUrl] = limitedResponse.data;
    }

    return apartmentDataCache[apartmentUrl];
  } catch (error) {
    throw new Error("Failed to fetch apartment data");
  }
};

// Next.js API 라우트 핸들러 함수 정의
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // console.log(
  //   "regionDataCache for URL:",
  //   regionDataCache[
  //     "http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?ServiceKey=XwiqW1NWk0Xl59Z18HVGJeIBaHPWk1KvQFMLwAHgQ9pJnoUPYl2wBDUEz0x%2BebLbCdwVxSBgVA2iF9DgLDx3kw%3D%3D&type=json&pageNo=1&numOfRows=10&flag=Y&locatadd_nm=서울특별시"
  //   ]
  // );
  // console.log(
  //   "apartmentDataCache for URL:",
  //   apartmentDataCache[
  //     "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?numOfRows=20&LAWD_CD=11710&DEAL_YMD=201512&serviceKey=XwiqW1NWk0Xl59Z18HVGJeIBaHPWk1KvQFMLwAHgQ9pJnoUPYl2wBDUEz0x%2BebLbCdwVxSBgVA2iF9DgLDx3kw%3D%3D"
  //   ]
  // );
  try {
    // 지역 정보 데이터 가져오기
    const regionData = await fetchRegionData();

    // 지역 코드 추출
    const regionIds = getRegionIds(regionData);

    // 병렬로 각 지역의 아파트 정보 데이터 가져오기
    const requests = regionIds.map((regionId) =>
      fetchApartmentDataForRegion(regionId)
    );

    const apartmentData = await Promise.all(requests);
    res.status(200).json(apartmentData); // JSON 형태로 아파트 정보 데이터 전송
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" }); // 오류 발생 시 500 상태 코드와 오류 메시지 응답
  }
}
