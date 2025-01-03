import type { IFirestore } from "@/src/commons/types";

export interface IItemActionsProps {
  isDeleted: boolean;
  el: IFirestore;
  onDeleteModalOpen?: (building: IFirestore) => void;
}
