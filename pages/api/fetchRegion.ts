import { getRegionData } from "@/src/commons/libraries/region/regionData";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function fetchRegion(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const data = await getRegionData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching region data" });
  }
}
