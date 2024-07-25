import { useEffect, useState } from "react";
// Firebase
import { db } from "@/pages/api/firebase";
import { collection, getDocs } from "firebase/firestore";

import type { IFirebaseData } from "@/src/types";

export const useFetchFireBase = (): IFirebaseData[] => {
  const [firebaseDatas, setFirebaseDatas] = useState<IFirebaseData[]>([]);

  useEffect(() => {
    const fetchBuildings = async (): Promise<void> => {
      try {
        const querySnapshot = await getDocs(collection(db, "apartment")); // 'building' 컬렉션을 참조합니다
        const datas: IFirebaseData[] = querySnapshot.docs.map((el) => {
          const data = el.data() as IFirebaseData;
          // 속성 순서를 일정하게 유지하여 새로운 객체 생성
          return {
            ...data,
          };
        });
        setFirebaseDatas(datas); // 데이터 상태 업데이트
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };
    void fetchBuildings();
  }, []);
  return firebaseDatas;
};
