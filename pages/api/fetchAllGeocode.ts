import { allGeocodeData } from "@/src/commons/libraries/geocode/allGeocodeData";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  console.log("Handler received query:", req.query);
  const { buildingType } = req.query; // 쿼리 문자열에서 buildingType을 추출합니다.

  if (typeof buildingType !== "string") {
    console.error("Invalid buildingType received in handler:", buildingType);
    res.status(400).json({ error: "Invalid buildingType" });
    return;
  }

  try {
    const data = await allGeocodeData(buildingType); // 지역 데이터 처리 함수를 호출하고 결과를 기다립니다
    console.log("Data received from allGeocodeData:", data);
    res.status(200).json(data); // 성공적으로 데이터를 받아 클라이언트에게 JSON 형태로 응답합니다
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}
