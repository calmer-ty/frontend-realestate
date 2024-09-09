import { useCallback } from "react";
import { db } from "@/src/commons/libraries/firebase/firebaseApp";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import type { IFirebaseData, IUseFirebaseProps } from "@/src/commons/types";
import type { IWriteFormData } from "@/src/components/units/buildings/write/types";

export const useFirebase = (): IUseFirebaseProps => {
  const createFirebaseData = useCallback(async (data: IWriteFormData, selectedType: string): Promise<void> => {
    try {
      const docRef = await addDoc(collection(db, selectedType), {
        ...data,
        type: selectedType,
      });

      // 문서 ID를 포함한 데이터로 업데이트
      await updateDoc(docRef, {
        _id: docRef.id,
      });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

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
      console.log("Document datas:", datas);
      return datas;
    } catch (error) {
      console.error("Error fetching buildings:", error);
      return [];
    }
  }, []);

  return {
    createFirebaseData,
    readFirebaseData,
    readFirebaseDatas,
  };
};
