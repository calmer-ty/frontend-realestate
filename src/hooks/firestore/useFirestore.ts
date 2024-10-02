import { useCallback } from "react";
import { db } from "@/src/commons/libraries/firebase/firebaseApp";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { convertFirestoreData } from "@/src/commons/libraries/utils/convertFirestoreType";
import type { IWriteFormData, IFirestoreData, IUseFirestoreProps } from "@/src/commons/types";

export const useFirestore = (): IUseFirestoreProps => {
  const createFirestoreData = useCallback(async (data: IWriteFormData, selectedType: string): Promise<void> => {
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

  const updateFirestoreData = useCallback(async (data: Partial<IWriteFormData>, selectedType: string, docId: string): Promise<void> => {
    const docRef = doc(db, selectedType, docId);
    try {
      await updateDoc(docRef, data);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

  const deleteFirestoreData = useCallback(async (data: Partial<IWriteFormData>, selectedType: string, docId: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, selectedType, docId));
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

  const readFirestoreData = useCallback(async (collection: string, docId: string) => {
    const docRef = doc(db, collection, docId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data != null) {
          return convertFirestoreData(data);
        }
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

  const readFirestoreDatas = useCallback(async (buildingType: string): Promise<IFirestoreData[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, buildingType));
      const datas = querySnapshot.docs.map((el) => el.data() as IFirestoreData);
      return datas;
    } catch (error) {
      console.error("Error fetching buildings:", error);
      return [];
    }
  }, []);

  return {
    createFirestoreData,
    updateFirestoreData,
    deleteFirestoreData,
    readFirestoreData,
    readFirestoreDatas,
  };
};
