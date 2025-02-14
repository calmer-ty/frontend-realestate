"use client";

import { useEffect, useState } from "react";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import Image from "next/image";
import type { IFirestore } from "@/src/commons/types";

export default function HomePage(): JSX.Element {
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
    <>
      <h2>이미지 테스트</h2>
      {firestoreDatas.map((el) => (
        <Image key={el._id} src={el.imageUrls?.[0] ?? "없음"} alt={el.buildingType} fill sizes="100%" style={{ objectFit: "cover" }} />
      ))}
    </>
  );
}
