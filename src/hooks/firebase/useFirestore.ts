import { useCallback } from "react";
import { db } from "@/src/commons/libraries/firebase/firebaseApp";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { convertFirestoreData } from "@/src/commons/libraries/utils/convertFirestoreType";
import type { IWriteForm, IFirestore, IUseFirestoreProps } from "@/src/commons/types";

export const useFirestore = (): IUseFirestoreProps => {
  const createFirestore = useCallback(async (data: IWriteForm, selectedType: string) => {
    try {
      const docRef = await addDoc(collection(db, selectedType), {
        ...data,
        type: selectedType,
        createdAt: serverTimestamp(), // 서버 시간 추가
      });

      // 문서 ID를 포함한 데이터로 업데이트
      await updateDoc(docRef, {
        _id: docRef.id,
      });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

  const archiveFirestore = useCallback(async (building: IFirestore) => {
    try {
      const docRef = await addDoc(collection(db, `deleted_${building.type}`), {
        ...building,
        deletedAt: serverTimestamp(), // 삭제된 시간 기록
      });
      // 문서 ID를 포함한 데이터로 업데이트
      await updateDoc(docRef, {
        _id: docRef.id,
      });
      console.log(`Building ${building._id} archived.`);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

  const updateFirestore = useCallback(async (data: Partial<IWriteForm>, selectedType: string, docId: string) => {
    const docRef = doc(db, selectedType, docId);
    try {
      await updateDoc(docRef, data);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

  const deleteFirestore = useCallback(async (selectedType: string, docId: string) => {
    try {
      await deleteDoc(doc(db, selectedType, docId));
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

  const readFirestore = useCallback(async (collection: string, docId: string) => {
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

  const readFirestores = useCallback(async (buildingType: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, buildingType));
      const datas = querySnapshot.docs.map((el) => el.data() as IFirestore);
      return datas;
    } catch (error) {
      console.error("Error fetching buildings:", error);
      return [];
    }
  }, []);

  return {
    createFirestore,
    archiveFirestore,
    updateFirestore,
    deleteFirestore,
    readFirestore,
    readFirestores,
  };
};
