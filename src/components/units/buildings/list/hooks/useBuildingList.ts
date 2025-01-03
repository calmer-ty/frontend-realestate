import { useEffect, useRef, useState } from "react";
import { DAY_LIMIT, DEFAULT_NUMBER_VALUE } from "@/src/commons/constants";

import type { IFirestore } from "@/src/commons/types";
import type { Unsubscribe } from "firebase/firestore";
import type { MutableRefObject } from "react";

interface IUseBuildingListReturn {
  myBuildings: IFirestore[];
  myDeletedBuildings: IFirestore[];
}

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
    // 아카이브 작업
    void archiveFirestore(building);
    // 삭제 작업
    void deleteFirestore(building.type, building._id);
    // 아카이브된 ID 기록
    archivedIds.current.add(building._id);
  }
};

export const useBuildingList = (
  buildings: IFirestore[],
  deletedBuildings: IFirestore[],
  userId: string | undefined,
  archiveFirestore: (building: IFirestore) => Promise<void>,
  deleteFirestore: (selectedType: string, docId: string) => Promise<void>,
  readFirestoresRealTime: (buildingType: string) => Unsubscribe
): IUseBuildingListReturn => {
  const archivedIds = useRef<Set<string>>(new Set());

  // 필터링된 건물 목록
  // const filteredBuildings = useMemo(() => {
  //   return buildings?.filter((el) => el.user?._id === userId);
  // }, [buildings, userId]);
  // 사용자의 매물 및 삭제된 매물만 필터링
  // 상태로 관리하기
  const [myBuildings, setMyBuildings] = useState<IFirestore[]>([]);
  const [myDeletedBuildings, setMyDeletedBuildings] = useState<IFirestore[]>([]);

  // 리렌더링을 트리거하려면 상태를 설정해줘야 한다
  useEffect(() => {
    setMyBuildings(buildings?.filter((el) => el.user?._id === userId) ?? []);
    setMyDeletedBuildings(deletedBuildings?.filter((el) => el.user?._id === userId) ?? []);
  }, [buildings, deletedBuildings, userId]);

  // 리얼타임 데이터 구독
  useEffect(() => {
    const unsubscribe = readFirestoresRealTime("apartment");

    // 컴포넌트가 unmount되면 구독을 해제
    return () => {
      unsubscribe();
    };
  }, [readFirestoresRealTime]);

  // 만료된 건물 처리
  useEffect(() => {
    console.log("myBuildings:", myBuildings); // 디버깅
    const expiredBuildings = getExpiredBuildings(myBuildings, archivedIds.current);
    console.log("Expired buildings:", expiredBuildings); // 디버깅
    expiredBuildings.forEach((building) => {
      processExpiredBuilding(building, archiveFirestore, deleteFirestore, archivedIds);
    });
  }, [myBuildings, archiveFirestore, deleteFirestore]);

  return { myBuildings, myDeletedBuildings };
};
