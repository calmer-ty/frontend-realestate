import axios from "axios";
import NodeCache from "node-cache";
import type { IReginCdData } from "@/commons/types";

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
  "전라북도",
  "전라남도",
  "충청북도",
  "충청남도",
];

const cache = new NodeCache({ stdTTL: 7200 });

export const fetchRegionData = async (city: string): Promise<IReginCdData> => {
  const cacheKey = `region_${city}`;
  const cachedData = cache.get<IReginCdData>(cacheKey);

  if (cachedData !== undefined) {
    console.log(`Cache hit for region data of ${city}`);
    return cachedData;
  }

  try {
    const reginCdKey = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
    const reginCdUrl = `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?ServiceKey=${reginCdKey}&type=json&pageNo=1&numOfRows=10&flag=Y&locatadd_nm=${encodeURIComponent(
      city
    )}`;

    const response = await axios.get(reginCdUrl);
    const regionData: IReginCdData = response.data;
    cache.set(cacheKey, regionData, 7200); // 캐시 만료 시간 설정 (여기서는 7200초, 즉 2시간)

    return regionData;
  } catch (error) {
    console.error(`Failed to fetch region data for ${city}:`, error);
    throw new Error(`Failed to fetch region data for ${city}`);
  }
};

export const fetchAllRegionData = async (): Promise<any> => {
  try {
    const promises = cities.map((city) => fetchRegionData(city));
    const regionDatas = await Promise.all(promises);
    regionDatas.forEach((regionData, index) => {
      console.log(`Region data for ${cities[index]}:`, regionData);
    });
    return regionDatas;
  } catch (error) {
    console.error("Error fetching region data:", error);
    throw error; // 이 부분에서 예외를 다시 throw하여 호출자에게 전파할 수 있도록 합니다.
  }
};
