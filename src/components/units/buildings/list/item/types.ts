import type { IFirestore } from "@/src/commons/types";

export interface IListItem {
  isDeleted: boolean;
  data: IFirestore[];
  onDeleteModalOpen?: (building: IFirestore) => void;
}
