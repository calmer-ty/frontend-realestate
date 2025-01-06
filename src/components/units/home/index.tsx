"use client";

import { useEffect, useState } from "react";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";

import BuildingTypeList from "./buildingTypeList";
import RecommendedList from "./recommendedList";

import type { IFirestore } from "@/src/commons/types";
import * as S from "./styles";

export default function Home(): JSX.Element {
  const [firestoreDatas, setFirestoreDatas] = useState<IFirestore[]>([]);
  const { readFirestores } = useFirestore();

  // firestoreDatas
  useEffect(() => {
    const readBuildings = async (): Promise<void> => {
      // 임시로 아파트만 랜덤 렌더링
      const datas = await readFirestores("buildings");
      setFirestoreDatas(datas);
    };
    void readBuildings();
  }, [readFirestores]);

  return (
    <S.Container>
      <BuildingTypeList />
      <RecommendedList firestoreDatas={firestoreDatas} />
    </S.Container>
  );
}
