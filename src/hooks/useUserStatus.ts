import { useEffect, useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { useFirestore } from "@/src/hooks/firebase/useFirestore2";

import type { IFirestore2 } from "@/src/commons/types";

export const useUserStatus = (): {
  userStatus: IFirestore2 | undefined;
} => {
  const { user } = useAuth();
  const userId = `${user?.uid}`;

  const [userStatus, setUserStatus] = useState<IFirestore2 | undefined>(undefined);
  const { readFirestores } = useFirestore();

  // firestoreDatas
  useEffect(() => {
    const readBuildings = async (): Promise<void> => {
      // 임시로 아파트만 랜덤 렌더링
      const datas = await readFirestores("userStatus");
      if (userId !== undefined) {
        const findData = datas.find((data) => data.user._id === userId);
        setUserStatus(findData);
      }
    };
    void readBuildings();
  }, [userId, readFirestores]);

  return { userStatus };
};
