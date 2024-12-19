import type { IFirestore } from "@/src/commons/types";
import type { MutableRefObject } from "react";

const EXPIRATION_THRESHOLD_SECONDS = 10;

export const getExpiredBuildings = (buildings: IFirestore[], archivedIds: Set<string>): IFirestore[] =>
  buildings.filter((el) => el._id !== undefined && Date.now() / 1000 > (el.createdAt?.seconds ?? 0) + EXPIRATION_THRESHOLD_SECONDS && !archivedIds.has(el._id));

export const processExpiredBuilding = (
  building: IFirestore,
  archiveFirestore: (building: IFirestore) => Promise<void>,
  deleteFirestore: (selectedType: string, docId: string) => Promise<void>,
  archivedIds: MutableRefObject<Set<string>>
): void => {
  if (building._id !== undefined && building.type !== undefined) {
    void archiveFirestore(building);
    void deleteFirestore(building.type, building._id);
    archivedIds.current.add(building._id);
  }
};
