"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useFirebase } from "@/src/hooks/firebase/useFirebase";
import type { IFirebaseData } from "@/src/commons/types";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

export default function BuildingList(): JSX.Element {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const [buildingData, setBuildingData] = useState<IFirebaseData[]>([]); // 상태로 데이터를 저장
  const { readFirebaseDatas } = useFirebase();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data = await readFirebaseDatas("apartment");
      setBuildingData(data);
    };
    void fetchData(); // 컴포넌트가 렌더링될 때 함수 호출
  }, [readFirebaseDatas]);

  const filteredData = buildingData.filter((el) => el.user?._id === userId);

  return (
    <>
      {status === "authenticated" ? (
        filteredData.map((el, index) => (
          <div key={`${el._id}_${index}`}>
            <div>{index}</div>
            <div>{el.type}</div>
            <div>{el.address}</div>
            <div>{el.addressDetail}</div>
          </div>
        ))
      ) : (
        <LoadingSpinner size={100} />
      )}
    </>
  );
}
