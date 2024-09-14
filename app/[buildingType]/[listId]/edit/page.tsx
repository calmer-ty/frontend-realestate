"use client";

import BuildingWrite from "@/src/components/units/buildings/write";
import { useFirestore } from "@/src/hooks/firestore/useFirestore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { IFirestoreData } from "@/src/commons/types";

export default function BuildingsEditPage(): JSX.Element {
  const pathname = usePathname();
  const buildingType = pathname?.split("/")[1];
  const docId = pathname?.split("/")[2];

  const [docData, setDocData] = useState<IFirestoreData>();
  const { readFirestoreData } = useFirestore();

  useEffect(() => {
    const readBuilding = async (): Promise<void> => {
      if (buildingType === undefined || docId === undefined) return;
      try {
        const data = await readFirestoreData(buildingType, docId); // 반환값의 타입을 확인
        setDocData(data); // 받아온 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching Firebase data:", error);
      }
    };

    void readBuilding();
  }, [readFirestoreData, buildingType, docId]); // 의존성 배열에 docId 추가

  return <BuildingWrite isEdit={true} docData={docData} />;
}
