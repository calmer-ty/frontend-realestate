import { regionAllData } from "@/src/commons/libraries/region/regionData";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const data = await regionAllData();
    res.status(200).json(data); // 성공적으로 데이터를 받아 클라이언트에게 JSON 형태로 응답합니다
  } catch (error) {
    res.status(500).json({ error: "Error fetching region data" }); // 데이터 가져오기 중 에러가 발생하면 500 상태 코드와 에러 메시지를 클라이언트에게 전달합니다
  }
}
