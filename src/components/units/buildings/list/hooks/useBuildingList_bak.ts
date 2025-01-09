import { useEffect, useMemo, useRef } from "react";

import { DEFAULT_NUMBER_VALUE } from "@/src/commons/constants";
import type { IFirestore } from "@/src/commons/types";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { Unsubscribe } from "firebase/firestore";

interface IUseBuildingListReturn {
  filteredBuildings: IFirestore[];
  // fetchData: () => Promise<void>;
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
  buildings: IFirestore[],
  setBuildings: Dispatch<SetStateAction<IFirestore[]>>,
  setDeletedBuildings: Dispatch<SetStateAction<IFirestore[]>>,
  readFirestores: (buildingType: string) => Promise<IFirestore[]>,
  archiveFirestore: (building: IFirestore) => Promise<void>,
  deleteFirestore: (docId: string) => Promise<void>,
  userId: string | undefined,
  readFirestoresRealTime: (buildingType: string) => Unsubscribe
): IUseBuildingListReturn => {
  const archivedIds = useRef<Set<string>>(new Set());

  const filteredBuildings = useMemo(() => filterBuildingsByUser(buildings, userId), [buildings, userId]);

  // // Firestore 패치
  // const fetchData = useCallback(async (): Promise<void> => {
  //   const collections = ["apartment", "house", "office"];
  //   const deletedCollections = ["deleted_apartment"];

  //   try {
  //     const buildings = (await Promise.all(collections.map(readFirestores))).flat();
  //     const deletedBuildings = (await Promise.all(deletedCollections.map(readFirestores))).flat();

  //     setBuildings(buildings);
  //     setDeletedBuildings(deletedBuildings);
  //   } catch (error) {
  //     console.error("Firebase 패치 오류가 있습니다: ", error);
  //   }
  // }, [setBuildings, setDeletedBuildings, readFirestores]);

  // useEffect(() => {
  //   void fetchData();
  // }, [fetchData]);

  // 리얼타임 데이터 구독
  useEffect(() => {
    const unsubscribeBuildings = [readFirestoresRealTime("apartment"), readFirestoresRealTime("house"), readFirestoresRealTime("office")];

    // 데이터가 실시간으로 업데이트되면 setBuildings와 setDeletedBuildings을 호출
    const unsubscribeDeletedBuildings = [readFirestoresRealTime("deleted_apartment")];

    // 컴포넌트가 언마운트될 때 구독 해제
    return () => {
      unsubscribeBuildings.forEach((unsubscribe) => {
        unsubscribe();
      });
      unsubscribeDeletedBuildings.forEach((unsubscribe) => {
        unsubscribe();
      });
    };
  }, [readFirestoresRealTime]);

  // 매물 리스트 데이터 렌더링
  useEffect(() => {
    const expiredBuildings = getExpiredBuildings(filteredBuildings, archivedIds.current);
    // 시간 초과가 되면 기존 정보 삭제 및 아카이브 등록
    expiredBuildings.forEach((building) => {
      processExpiredBuilding(building, archiveFirestore, deleteFirestore, archivedIds);
    });
  }, [filteredBuildings, archiveFirestore, deleteFirestore]);

  return { filteredBuildings };
};
