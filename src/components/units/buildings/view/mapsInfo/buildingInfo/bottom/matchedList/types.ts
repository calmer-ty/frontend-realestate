import type { IFirestore } from "@/src/commons/types";

export interface IMatchedListProps {
  matchedData: IFirestore[];
  buildingType: string;
}
