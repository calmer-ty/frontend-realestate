import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAllRegionData } from "../../commons/lib/regionData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const data = await fetchAllRegionData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching region data" });
  }
}
