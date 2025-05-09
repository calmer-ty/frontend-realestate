"use client";

import { useEffect, useState } from "react";
import { useFirestore } from "@/src/commons/hooks/firebase/useFirestore";

import HomePrimary from "./primary";
import HomeSecondary from "./secondary";

import type { IFirestore } from "@/src/commons/types";

export default function Home(): JSX.Element {
  const [firestoreData, setFirestoreData] = useState<IFirestore[]>([]);

  const { readFirestores } = useFirestore();

  // firestoreDatas;
  useEffect(() => {
    const readBuildings = async (): Promise<void> => {
      // 임시로 아파트만 랜덤 렌더링
      const datas = await readFirestores("buildings");
      setFirestoreData(datas);
    };
    void readBuildings();
  }, [readFirestores]);

  return (
    <article className="flex flex-col gap-2 h-[calc(100vh_-_3.75rem)] bg-gray-100">
      <HomePrimary />
      <HomeSecondary firestoreData={firestoreData} />
    </article>
  );
}
