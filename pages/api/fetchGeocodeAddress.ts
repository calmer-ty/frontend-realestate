import { geocode } from "@/src/commons/libraries/geocode/geocode";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { address } = req.query;
  if (typeof address !== "string") {
    res.status(400).json({ error: "Invalid address parameter" });
    return;
  }

  try {
    const data = await geocode(address); // 지역 데이터 처리 함수를 호출하고 결과를 기다립니다
    res.status(200).json(data); // 성공적으로 데이터를 받아 클라이언트에게 JSON 형태로 응답합니다
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}
