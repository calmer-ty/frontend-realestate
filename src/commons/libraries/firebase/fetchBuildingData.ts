import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/commons/libraries/firebase/firebaseApp";

import type { DocumentData } from "firebase/firestore";

// Firestore 데이터 읽기 함수
export const fetchBuildingData = async (colName: string, docId: string): Promise<DocumentData | null> => {
  try {
    const docRef = doc(db, colName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // Firestore 데이터 반환
    } else {
      console.error("문서를 찾을 수 없습니다.");
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Firestore 오류:", error.message);
    }
    return null;
  }
};
