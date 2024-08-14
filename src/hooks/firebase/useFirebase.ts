import { db } from "@/src/commons/libraries/firebase/firebaseApp";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import type { IFirebaseData } from "@/src/commons/types";
import { useCallback } from "react";

export const useFirebase = (): {
  readFirebaseData: (data: IFirebaseData) => Promise<void>;
  readFirebaseDatas: (buildingType: string) => Promise<IFirebaseData[]>;
} => {
  const readFirebaseData = useCallback(async (data: IFirebaseData): Promise<void> => {
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
  }, []);

  const readFirebaseDatas = useCallback(async (buildingType: string): Promise<IFirebaseData[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, buildingType));
      const datas = querySnapshot.docs.map((el) => el.data() as IFirebaseData);
      return datas;
    } catch (error) {
      console.error("Error fetching buildings:", error);
      return [];
    }
  }, []);

  return {
    readFirebaseData,
    readFirebaseDatas,
  };
};
