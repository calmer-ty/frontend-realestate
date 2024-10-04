import type { IFirestoreData } from "@/src/commons/types";

export interface IListItem {
  isDeleted: boolean;
  data: IFirestoreData[];
  onDeleteModalOpen?: (building: IFirestoreData) => void;
}
