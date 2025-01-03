import { useEffect } from "react";

import type { IFirestore } from "@/src/commons/types";
import type { Unsubscribe } from "firebase/firestore";

interface IUseBuildingListReturn {
  myBuildings: IFirestore[];
  myDeletedBuildings: IFirestore[];
}

// 광고기한 초 - 60초 * 60분 * 24시간
// const DAY_LIMIT = 60 * 60 * 24;

export const useBuildingList = (
  buildings: IFirestore[],
  deletedBuildings: IFirestore[],
  userId: string | undefined,
  readFirestoresRealTime: (buildingType: string) => Unsubscribe
): IUseBuildingListReturn => {
  useEffect(() => {
    const unsubscribe = readFirestoresRealTime("apartment");
    // 컴포넌트가 unmount되면 구독을 해제
    return () => {
      unsubscribe();
    };
  }, [readFirestoresRealTime]);

  // 사용자의 매물 및 삭제된 매물만 필터링
  const myBuildings = buildings?.filter((el) => el.user?._id === userId);
  const myDeletedBuildings = deletedBuildings?.filter((el) => el.user?._id === userId);

  return { myBuildings, myDeletedBuildings };
};
