import { db } from "@/src/commons/libraries/firebase/firebaseApp";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import type { IFirebaseData } from "@/src/commons/types";

export const useFirebase = (): {
  readFirebaseData: (data: IFirebaseData) => Promise<void>;
  readFirebaseDatas: (buildingType: string) => Promise<IFirebaseData[]>;
} => {
  const readFirebaseData = async (data: IFirebaseData): Promise<void> => {
    const docRef = doc(db, data.type, data._id);
    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };
  const readFirebaseDatas = async (buildingType: string): Promise<IFirebaseData[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, buildingType)); // 'buildingType' 컬렉션을 참조합니다
      const datas = querySnapshot.docs.map((el) => {
        const data = el.data() as IFirebaseData;
        // 속성 순서를 일정하게 유지하여 새로운 객체 생성
        return data;
      });
      return datas; // 데이터를 반환합니다
    } catch (error) {
      console.error("Error fetching buildings:", error);
      return []; // 오류 발생 시 빈 배열을 반환합니다
    }
  };
  return {
    readFirebaseData,
    readFirebaseDatas,
  };
};
