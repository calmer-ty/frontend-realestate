import type { IFirestore } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";

export interface IDeleteModalProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setBuildings: Dispatch<SetStateAction<IFirestore[]>>;
  archiveFirestore: (building: IFirestore) => Promise<void>;
  deleteFirestore: (selectedType: string, docId: string) => Promise<void>;
  fetchData: () => Promise<void>;
  selectedBuilding: IFirestore | null;
}
