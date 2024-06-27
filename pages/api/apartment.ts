// import axios from "axios";

// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ): Promise<void> {
//   const apartmentKey = process.env.NEXT_PUBLIC_APARTMENT_TD_KEY;
//   const apartmentUrl = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?numOfRows=12&LAWD_CD=11140&DEAL_YMD=201512&serviceKey=${apartmentKey}`;
//   try {
//     const response = await axios.get(apartmentUrl);
//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching data" });
//   }
// }

import axios from "axios";

import type { NextApiRequest, NextApiResponse } from "next";

const fetchRegionData = async (): Promise<any> => {
  const reginCdKey = process.env.NEXT_PUBLIC_STAN_REGIN_CD_KEY;
  const reginCdUrl = `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?ServiceKey=${reginCdKey}&type=json&pageNo=1&numOfRows=2&flag=Y&locatadd_nm=서울특별시`;

  try {
    const response = await axios.get(reginCdUrl);
    console.log(
      "=============서버입니다=================",
      // response.data.StanReginCd[1].row[0].region_cd,
      response.data.StanReginCd[1],
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch region codes");
  }
};
void fetchRegionData();

const fetchApartmentData = async (): Promise<any> => {
  const apartmentKey = process.env.NEXT_PUBLIC_APARTMENT_TD_KEY;
  const apartmentUrl = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?numOfRows=12&LAWD_CD=11140&DEAL_YMD=201512&serviceKey=${apartmentKey}`;

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
    // const [regionCodes, apartmentData] = await Promise.all([
    //   fetchRegionCodes(),
    //   fetchApartmentData(),
    // ]);
    // res.status(200).json({ regionCodes, apartmentData });

    const apartmentData = await fetchApartmentData();
    res.status(200).json(apartmentData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
}
