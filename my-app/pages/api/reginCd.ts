// import type { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ): Promise<void> {
//   const reginCdKey = process.env.NEXT_PUBLIC_STAN_REGIN_CD_KEY;
//   const reginCdUrl = `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?ServiceKey=${APIKey}&type=json&pageNo=1&numOfRows=2&flag=Y&locatadd_nm=서울특별시`;
//   try {
//     const response = await axios.get(url);
//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching data" });
//   }
// }
