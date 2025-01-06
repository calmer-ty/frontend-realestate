import type { IFirestore } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";

// export interface IGetExpiredBuildingsProps {
//   buildings: IFirestore[];
//   archivedIds: MutableRefObject<Set<string>>;
// }

// export interface IProcessExpiredBuildingProps {
//   building: IFirestore;
//   archiveFirestore: (building: IFirestore) => Promise<void>;
//   deleteFirestore: (selectedType: string, docId: string) => Promise<void>;
//   archivedIds: MutableRefObject<Set<string>>;
// }

export interface IDeleteModalProps {
  selectedBuilding: IFirestore | null;
  buildings: IFirestore[];
  setBuildings: Dispatch<SetStateAction<IFirestore[]>>;
  setDeletedBuildings: Dispatch<SetStateAction<IFirestore[]>>;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  archiveFirestore: (data: IFirestore, colName: string) => Promise<void>;
  deleteFirestore: (colName: string, docId: string) => Promise<void>;
  readFirestores: (colName: string) => Promise<IFirestore[]>;
}
