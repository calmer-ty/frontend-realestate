"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { useFirestore } from "@/src/hooks/firebase/useFirestore2";

import UserStatusWrite from "@/src/components/units/userStatus/write";

import type { IFirestore2 } from "@/src/commons/types";

export default function UserStatusEditPage(): JSX.Element {
  const { user } = useAuth();
  const userId = `${user?.uid}`;

  const [firestoreData, setFirestoreData] = useState<IFirestore2 | undefined>(undefined);
  const { readFirestores } = useFirestore();

  // firestoreDatas
  useEffect(() => {
    const readBuildings = async (): Promise<void> => {
      // 임시로 아파트만 랜덤 렌더링
      const datas = await readFirestores("userStatus");
      if (userId !== undefined) {
        const findData = datas.find((data) => data.user._id === userId);
        setFirestoreData(findData);
      }
    };
    void readBuildings();
  }, [userId, readFirestores]);

  return <UserStatusWrite isEdit={true} firestoreData={firestoreData} />;
}
