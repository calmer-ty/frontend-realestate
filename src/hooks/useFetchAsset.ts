import { useEffect, useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { useFirestoreAsset } from "@/src/hooks/firebase/useFirestoreAsset";

import type { IFirestoreAsset } from "@/src/commons/types";

export const useFetchAsset = (): {
  asset: IFirestoreAsset | undefined;
} => {
  const { user } = useAuth();
  const userId = `${user?.uid}`;

  const [asset, setAsset] = useState<IFirestoreAsset | undefined>(undefined);
  const { readFirestores } = useFirestoreAsset();

  // firestoreDatas
  useEffect(() => {
    const readBuildings = async (): Promise<void> => {
      // 임시로 아파트만 랜덤 렌더링
      const datas = await readFirestores("asset");
      if (userId !== undefined) {
        const findData = datas.find((data) => data.user._id === userId);
        setAsset(findData);
      }
    };
    void readBuildings();
  }, [userId, readFirestores]);

  return { asset };
};
