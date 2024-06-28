// import axios from "axios";
// import type { IReginCdData } from "@/common/types/types";

// import type { NextApiRequest, NextApiResponse } from "next";

// const fetchRegionData = async (): Promise<any> => {
//   const reginCdKey = process.env.NEXT_PUBLIC_PUBLIC_DATA;
//   const reginCdUrl = `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?ServiceKey=${reginCdKey}&type=json&pageNo=1&numOfRows=400&flag=Y&locatadd_nm=서울특별시`;

//   try {
//     const response = await axios.get<IReginCdData>(reginCdUrl);
//     console.log("fetchRegionData: ", response.data.StanReginCd[1]);
//     const areaCode = new Set();
//     response.data.StanReginCd[1].row.forEach((el) => {
//       areaCode.add(el.region_cd.slice(0, 5));
//     });
//     const areaCodeArray = Array.from(areaCode);
//     return areaCodeArray;
//   } catch (error) {
//     throw new Error("Failed to fetch region codes");
//   }
// };
// void fetchRegionData();

// const fetchApartmentData = async (areaCodes: string[]): Promise<any> => {
//   console.log("=============서버입니다=================");
//   const apartmentKey = process.env.NEXT_PUBLIC_PUBLIC_DATA;
//   const apartmentDataArray: any[] = [];

//   for (const LAWD_CD of areaCodes) {
//     const apartmentUrl = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?numOfRows=300&LAWD_CD=${LAWD_CD}&DEAL_YMD=201512&serviceKey=${apartmentKey}`;

//     try {
//       const response = await axios.get(apartmentUrl);
//       apartmentDataArray.push(response.data);
//       // return response.data;
//     } catch (error) {
//       console.error(`Failed to fetch data for LAWD_CD ${LAWD_CD}`, error);
//       apartmentDataArray.push({
//         error: `Failed to fetch data for LAWD_CD ${LAWD_CD}`,
//       });
//     }
//   }
//   return apartmentDataArray;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ): Promise<void> {
//   try {
//     const regionData: string[] = await fetchRegionData(); // region codes 가져오기
//     const apartmentData = await fetchApartmentData(regionData);
//     res.status(200).json(apartmentData);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching data" });
//   }
// }

import axios from "axios";

import type { NextApiRequest, NextApiResponse } from "next";

const fetchRegionData = async (): Promise<any> => {
  const reginCdKey = process.env.NEXT_PUBLIC_PUBLIC_DATA;
  const reginCdUrl = `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?ServiceKey=${reginCdKey}&type=json&pageNo=1&numOfRows=10&flag=Y&locatadd_nm=서울특별시`;

  try {
    const response = await axios.get(reginCdUrl);
    // console.log(
    //   "=============서버입니다=================",
    //   // response.data.StanReginCd[1].row[0].region_cd,
    //   response.data.StanReginCd[1],
    // );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch region codes");
  }
};
void fetchRegionData();

const fetchApartmentData = async (): Promise<any> => {
  const apartmentKey = process.env.NEXT_PUBLIC_PUBLIC_DATA;
  const apartmentUrl = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?numOfRows=10&LAWD_CD=11140&DEAL_YMD=201512&serviceKey=${apartmentKey}`;

  try {
    const response = await axios.get(apartmentUrl);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch apartment data");
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const apartmentData = await fetchApartmentData();
    res.status(200).json(apartmentData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
}
