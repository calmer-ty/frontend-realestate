import type { NextApiRequest, NextApiResponse } from "next"; // Next.js의 API 요청 및 응답 타입을 가져옵니다
import { regionAllData } from "@/src/commons/libraries/region/regionData"; // 지역 데이터 처리 함수를 가져옵니다

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const data = await regionAllData(); // 지역 데이터 처리 함수를 호출하고 결과를 기다립니다
    res.status(200).json(data); // 성공적으로 데이터를 받아 클라이언트에게 JSON 형태로 응답합니다
  } catch (error) {
    res.status(500).json({ error: "Error fetching region data" }); // 데이터 가져오기 중 에러가 발생하면 500 상태 코드와 에러 메시지를 클라이언트에게 전달합니다
  }
}
