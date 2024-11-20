import { regionApi } from "./regionApi";
import { getCachedRegionData, setRegionCache } from "./regionCache";
import { DEFAULT_STRING_VALUE } from "../../constants";
import type { IRegion, IRegionItem } from "@/src/commons/types";

// 지역 데이터를 가져올 도시 리스트
const cityList = [
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
  "세종특별자치시",
  "전북특별자치도",
  "제주특별자치도",
  "강원특별자치도",
];

// 특정 도시의 지역 데이터를 가져오는 함수
const getRegionData = async (city: string): Promise<IRegion> => {
  const cacheKey = `region_${city}`;
  const cachedData = getCachedRegionData(cacheKey);

  if (cachedData !== undefined) {
    // console.log(`지역 코드 ${result.region_cd}에 대한 아파트 데이터 캐시 히트`);
    return cachedData;
  }

  try {
    const regionData = await regionApi(city);
    setRegionCache(cacheKey, regionData);
    return regionData;
  } catch (error) {
    throw new Error(`${city}의 지역 데이터를 가져오는 데 실패했습니다`);
  }
};

// 모든 주소의 region_cd을 추출하기 위해 모아서 한꺼번에 보낸다
export const getAllRegionData = async (): Promise<IRegionItem[]> => {
  try {
    const promises = cityList.map((city) => getRegionData(city)); // 각 도시에 대해 데이터를 가져오는 Promise 배열을 생성합니다
    const regionDatas = await Promise.all(promises); // Promise.all을 사용해 모든 데이터를 병렬로 가져옵니다

    return regionDatas.flatMap((data) => {
      const rows = data?.StanReginCd?.[1]?.row ?? [];
      return rows
        .filter((el): el is IRegionItem => el.umd_cd === "000" && el.sgg_cd !== "000")
        .map((el) => ({
          region_cd: el.region_cd?.slice(0, 5) ?? DEFAULT_STRING_VALUE, // 기본값 설정
        }));
    });
  } catch (error) {
    console.error("지역 데이터를 가져오는 중 에러 발생:", error); // 모든 도시의 지역 데이터 가져오기 실패 시 에러를 로깅합니다
    throw error;
  }
};
