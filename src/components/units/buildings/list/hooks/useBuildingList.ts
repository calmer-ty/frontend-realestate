import { useState, useEffect, useMemo, useCallback, useRef } from "react";

import type { IFirestore } from "@/src/commons/types";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import { DEFAULT_NUMBER_VALUE } from "@/src/commons/constants";

interface IUseBuildingListReturn {
  deletedBuildings: IFirestore[];
  filteredBuildings: IFirestore[];
  fetchData: () => Promise<void>;
  setBuildings: Dispatch<SetStateAction<IFirestore[]>>;
}

// 광고기한 초 - 60초 * 60분 * 24시간
// const DAY_LIMIT = 60 * 60 * 24;
const DAY_LIMIT = 10;

// 만료된 건물들을 필터링
const getExpiredBuildings = (buildings: IFirestore[], archivedIds: Set<string>): IFirestore[] =>
  buildings.filter((el) => el._id !== undefined && Date.now() / 1000 > (el.createdAt?.seconds ?? DEFAULT_NUMBER_VALUE) + DAY_LIMIT && !archivedIds.has(el._id));

// 기한이 지난 건물은 즉시 아카이브되고 Firestore에서 삭제
const processExpiredBuilding = (
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

// 특정 사용자에 속하는 건물만 필터링
const filterBuildingsByUser = (buildings: IFirestore[], userId: string | undefined): IFirestore[] => buildings.filter((el) => el.user?._id === userId);

export const useBuildingList = (
  readFirestores: (buildingType: string) => Promise<IFirestore[]>,
  archiveFirestore: (building: IFirestore) => Promise<void>,
  deleteFirestore: (selectedType: string, docId: string) => Promise<void>,
  userId: string | undefined
): IUseBuildingListReturn => {
  const [buildings, setBuildings] = useState<IFirestore[]>([]);
  const [deletedBuildings, setDeletedBuildings] = useState<IFirestore[]>([]);
  const archivedIds = useRef<Set<string>>(new Set());

  const filteredBuildings = useMemo(() => filterBuildingsByUser(buildings, userId), [buildings, userId]);

  // Firestore 패치
  const fetchData = useCallback(async (): Promise<void> => {
    const collections = ["apartment", "house", "office"];
    const deletedCollections = ["deleted_apartment"];

    try {
      const buildings = (await Promise.all(collections.map(readFirestores))).flat();
      const deletedBuildings = (await Promise.all(deletedCollections.map(readFirestores))).flat();

      setBuildings(buildings);
      setDeletedBuildings(deletedBuildings);
    } catch (error) {
      console.error("Firebase 패치 오류가 있습니다: ", error);
    }
  }, [readFirestores]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  // 매물 리스트 데이터 렌더링
  useEffect(() => {
    const expiredBuildings = getExpiredBuildings(filteredBuildings, archivedIds.current);
    // 시간 초과가 되면 기존 정보 삭제 및 아카이브 등록
    expiredBuildings.forEach((building) => {
      processExpiredBuilding(building, archiveFirestore, deleteFirestore, archivedIds);
    });
  }, [filteredBuildings, archiveFirestore, deleteFirestore]);

  return { deletedBuildings, filteredBuildings, fetchData, setBuildings };
};
