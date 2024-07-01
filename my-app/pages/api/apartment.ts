import axios from "axios";
import type { IApartmentData, IReginCdData } from "@/commons/types";
import type { NextApiRequest, NextApiResponse } from "next";

const city = [
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

const fetchRegionData = async (): Promise<IReginCdData> => {
  const reginCdKey = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
  const reginCdUrl = `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?ServiceKey=${reginCdKey}&type=json&pageNo=1&numOfRows=10&flag=Y&locatadd_nm=${city[0]}`;
  try {
    const response = await axios.get(reginCdUrl);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch region codes");
  }
};
void fetchRegionData();

const fetchApartmentData = async (
  regionData: IReginCdData
): Promise<IApartmentData[]> => {
  try {
    const apartmentKey = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
    const regionIds = regionData.StanReginCd[1].row.map((el) =>
      el.region_cd.replace(/.{5}$/, "")
    );
    const uniqueRegionIds = new Set(regionIds);

    const requests = Array.from(uniqueRegionIds).map(async (el) => {
      const apartmentUrl = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?numOfRows=10&LAWD_CD=${11710}&DEAL_YMD=201512&serviceKey=${apartmentKey}`;
      const response = await axios.get(apartmentUrl);
      return response.data;
    });

    return await Promise.all(requests);
  } catch (error) {
    throw new Error("Failed to fetch apartment data");
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const regionData = await fetchRegionData(); // 각 도시별 지역 데이터 가져오기
    const apartmentData = await fetchApartmentData(regionData);
    res.status(200).json(apartmentData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
}
