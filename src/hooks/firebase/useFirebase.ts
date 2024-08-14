import { db } from "@/src/commons/libraries/firebase/firebaseApp";
import { doc, getDoc } from "firebase/firestore";

import type { IFirebaseData } from "@/src/commons/types";

export const useFirebase = (): {
  readFirebaseData: (data: IFirebaseData) => Promise<void>;
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
  return {
    readFirebaseData,
  };
};
