"use client";

import { useEffect, useState } from "react";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";

import HomePrimary from "./primary";
import HomeSecondary from "./secondary";

import * as S from "./styles";
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
    <S.Container>
      <HomePrimary />
      <HomeSecondary firestoreData={firestoreData} />
    </S.Container>
  );
}
