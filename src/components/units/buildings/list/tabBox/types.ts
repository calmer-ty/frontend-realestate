import type { IFirestore } from "@/src/commons/types";

export interface ITabBoxProps {
  myBuildings: IFirestore[];
  myDeletedBuildings: IFirestore[];
  onDeleteModalOpen: (building: IFirestore) => void;
}
