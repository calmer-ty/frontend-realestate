"use client";

import { useEffect, useState } from "react";
import { useFirestore } from "@/src/commons/hooks/firebase/useFirestore";

import Primary from "./primary";
import Secondary from "./secondary";

import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";

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

  // 모바일 해상도일 경우 주소 이동
  const router = useRouter();
  const isSmall = useMediaQuery("(max-width:480px)");

  useEffect(() => {
    if (isSmall) {
      router.push("/apartment");
    }
  }, [router, isSmall]);

  return (
    <article className="flex flex-col gap-2 h-[calc(100vh_-_3.75rem)] bg-blue-50">
      <Primary />
      <Secondary firestoreData={firestoreData} />
    </article>
  );
}
