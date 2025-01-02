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
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setBuildings: Dispatch<SetStateAction<IFirestore[]>>;
  archiveFirestore: (building: IFirestore) => Promise<void>;
  deleteFirestore: (selectedType: string, docId: string) => Promise<void>;
  // fetchData: () => Promise<void>;
  selectedBuilding: IFirestore | null;
}
