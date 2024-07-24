"use client";

import { db } from "@/pages/api/firebase";
import { collection, getDocs } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { IFirebaseData } from "@/src/types";

export default function BuildingsDetailPage(): JSX.Element {
  const [fbData, setFbData] = useState<IFirebaseData[]>();

  const fetchData = async (): Promise<void> => {
    try {
      const querySnapshot = await getDocs(collection(db, "apartment")); // 컬렉션을 참조합니다
      const datas = querySnapshot.docs.map((el) => el.data() as IFirebaseData); // 각 문서의 데이터를 추출하여 배열에 저장합니다
      console.log(datas);
      setFbData(datas);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  const pathname = usePathname();
  // id값 뽑는 정규식
  const extractIdFromPathname = (path: string | null): string | null => {
    // 정규 표현식 패턴을 사용하여 ID를 추출합니다
    const regex = /\/buildings\/([a-f0-9-]{36})\/$/;
    const match = path?.match(regex);
    // 정규 표현식이 일치하면 ID를 반환하고, 그렇지 않으면 null을 반환합니다
    return match !== null && match !== undefined ? match?.[1] : null;
  };
  const id = extractIdFromPathname(pathname);
  console.log(id);

  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <>
      {/* <br /> */}
      {fbData
        ?.filter((el) => el._id === id)
        .map((el) => (
          <div key={el._id}>
            <div>{el.address}</div>
            <div>{el.addressDetail}</div>
            <div>{el.floor}</div>
            <div>{el.price}</div>
          </div>
        ))}
    </>
  );
}
