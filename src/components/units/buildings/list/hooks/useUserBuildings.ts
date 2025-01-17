import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";

import type { IFirestore } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";
interface IUseUserBuildingsParams {
  setBuildings: Dispatch<SetStateAction<IFirestore[]>>;
  setDeletedBuildings: Dispatch<SetStateAction<IFirestore[]>>;
  readFirestores: (colName: string) => Promise<IFirestore[]>;
}
interface IUseUserBuildingsReturn {
  loading: boolean;
}

export const useUserBuildings = ({ setBuildings, setDeletedBuildings, readFirestores }: IUseUserBuildingsParams): IUseUserBuildingsReturn => {
  const { user } = useAuth();
  const userId = user?.uid;
  const [loading, setLoading] = useState(true);

  const fetchBuildings = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      // Firebase에서 아파트, 집, 삭제된 아파트 데이터를 가져옴
      const buildings = await readFirestores("buildings");
      const deletedBuildings = await readFirestores("deleted_buildings");

      // 유저 ID에 맞는 건물 필터링
      const userBuildings = buildings.filter((el) => el.user?._id === userId);
      const userDeletedBuildings = deletedBuildings.filter((el) => el.user?._id === userId);

      // 상태 업데이트: 유저 데이터만 설정
      setBuildings(userBuildings);
      setDeletedBuildings(userDeletedBuildings);
    } catch (error) {
      console.error("Error fetching buildings:", error);
    } finally {
      setLoading(false); // 데이터 로딩 완료
    }
  }, [userId, setBuildings, setDeletedBuildings, readFirestores]);

  useEffect(() => {
    if (userId !== undefined) {
      // 컴포넌트가 마운트될 때 데이터 한 번만 불러옴
      void fetchBuildings();
    }
  }, [userId, fetchBuildings]);

  return { loading };
};
