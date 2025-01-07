import type { IFirestore } from "@/src/commons/types";

export interface IBuildingListItemProps {
  isDeleted: boolean;
  el: IFirestore;
  index: number;
  onDeleteModalOpen?: (building: IFirestore) => void;
}
