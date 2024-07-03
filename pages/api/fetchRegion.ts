import type { NextApiRequest, NextApiResponse } from "next";
import { regionAllData } from "../../commons/libraries/regionData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const data = await regionAllData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching region data" });
  }
}
