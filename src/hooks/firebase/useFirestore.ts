import { useCallback } from "react";
import { db } from "@/src/commons/libraries/firebase/firebaseApp";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { convertFirestoreData } from "@/src/commons/libraries/utils/convertFirestoreType";

import type { IWriteForm, IFirestore, IAssetForm } from "@/src/commons/types";

interface IUseFirestoreReturn {
  createFirestore: (data: IWriteForm | IAssetForm, colName: string) => Promise<void>;
  updateFirestore: (data: Partial<IWriteForm | IAssetForm>, colName: string, docId: string) => Promise<void>;
  archiveFirestore: (data: IFirestore, colName: string) => Promise<void>;
  deleteFirestore: (colName: string, docId: string) => Promise<void>;
  readFirestore: (colName: string, docId: string) => Promise<IFirestore | undefined>;
  readFirestores: (colName: string) => Promise<IFirestore[]>;
}

export const useFirestore = (): IUseFirestoreReturn => {
  const createFirestore = useCallback(async (data: IWriteForm | IAssetForm, colName: string) => {
    try {
      const docRef = await addDoc(collection(db, colName), {
        ...data,
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

  const updateFirestore = useCallback(async (data: Partial<IWriteForm | IAssetForm>, colName: string, docId: string) => {
    const docRef = doc(db, colName, docId);
    try {
      await updateDoc(docRef, data);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

  const deleteFirestore = useCallback(async (colName: string, docId: string) => {
    try {
      await deleteDoc(doc(db, colName, docId));
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

  const archiveFirestore = useCallback(async (data: IFirestore, colName: string) => {
    try {
      const docRef = await addDoc(collection(db, colName), {
        ...data,
        deletedAt: serverTimestamp(), // 삭제된 시간 기록
      });
      // 문서 ID를 포함한 데이터로 업데이트
      await updateDoc(docRef, {
        _id: docRef.id,
      });
      // console.log(`Building ${data._id} archived.`);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

  const readFirestore = useCallback(async (colName: string, docId: string) => {
    const docRef = doc(db, colName, docId);
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

  const readFirestores = useCallback(async (colName: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, colName));
      const datas = querySnapshot.docs.map((el) => el.data() as IFirestore);
      return datas;
    } catch (error) {
      console.error("Error fetching buildings:", error);
      return [];
    }
  }, []);

  // 추가된 실시간 데이터 구독 함수

  // const readFirestoresRealTime = useCallback((buildingType: string, setBuildings: Dispatch<SetStateAction<IFirestore[]>>, setDeletedBuildings: Dispatch<SetStateAction<IFirestore[]>>): Unsubscribe => {
  //   const buildingsCollection = collection(db, buildingType);
  //   const deletedBuildingsCollection = collection(db, `deleted_${buildingType}`);

  //   // 등록된 데이터 구독
  //   const unsubscribeBuildings = onSnapshot(buildingsCollection, (snapshot) => {
  //     const updatedBuildings = snapshot.docs.map((doc) => doc.data() as IFirestore);
  //     setBuildings(updatedBuildings);
  //   });

  //   // 삭제된 데이터 구독
  //   const unsubscribeDeletedBuildings = onSnapshot(deletedBuildingsCollection, (snapshot) => {
  //     const updatedDeletedBuildings = snapshot.docs.map((doc) => doc.data() as IFirestore);
  //     setDeletedBuildings(updatedDeletedBuildings);
  //   });

  //   // 구독 해제 함수 반환
  //   return () => {
  //     unsubscribeBuildings();
  //     unsubscribeDeletedBuildings();
  //   };
  // }, []);

  return { createFirestore, updateFirestore, archiveFirestore, deleteFirestore, readFirestore, readFirestores };
};
