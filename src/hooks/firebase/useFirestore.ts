import { useCallback, useState } from "react";
import { db } from "@/src/commons/libraries/firebase/firebaseApp";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { convertFirestoreData } from "@/src/commons/libraries/utils/convertFirestoreType";

import type { Dispatch, SetStateAction } from "react";
import type { Unsubscribe } from "firebase/firestore";
import type { IWriteForm, IFirestore } from "@/src/commons/types";

interface IUseFirestoreReturn {
  buildings: IFirestore[];
  deletedBuildings: IFirestore[];
  setBuildings: Dispatch<SetStateAction<IFirestore[]>>;
  setDeletedBuildings: Dispatch<SetStateAction<IFirestore[]>>;
  createFirestore: (data: IWriteForm, selectedTypeEng: string) => Promise<void>;
  archiveFirestore: (building: IFirestore) => Promise<void>;
  updateFirestore: (data: Partial<IWriteForm>, selectedType: string, docId: string) => Promise<void>;
  deleteFirestore: (selectedType: string, docId: string) => Promise<void>;
  readFirestore: (collection: string, docId: string) => Promise<IFirestore | undefined>;
  readFirestores: (buildingType: string) => Promise<IFirestore[]>;
  readFirestoresRealTime: (buildingType: string) => Unsubscribe;
}

export const useFirestore = (): IUseFirestoreReturn => {
  const [buildings, setBuildings] = useState<IFirestore[]>([]);
  const [deletedBuildings, setDeletedBuildings] = useState<IFirestore[]>([]);
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

  // 추가된 실시간 데이터 구독 함수
  const readFirestoresRealTime = useCallback((buildingType: string) => {
    // 등록된 데이터와 삭제된 데이터 컬렉션 구독
    const buildingsCollection = collection(db, buildingType);
    const deletedBuildingsCollection = collection(db, `deleted_${buildingType}`);

    // 각각 실시간 구독
    const unsubscribeBuildings = onSnapshot(buildingsCollection, (snapshot) => {
      const updatedBuildings = snapshot.docs.map((doc) => doc.data() as IFirestore);
      setBuildings(updatedBuildings); // 등록된 데이터 상태 업데이트
    });

    const unsubscribeDeletedBuildings = onSnapshot(deletedBuildingsCollection, (snapshot) => {
      const updatedDeletedBuildings = snapshot.docs.map((doc) => doc.data() as IFirestore);
      setDeletedBuildings(updatedDeletedBuildings); // 삭제된 데이터 상태 업데이트
    });

    // 두 구독을 해제할 수 있도록 함수 반환
    return () => {
      unsubscribeBuildings();
      unsubscribeDeletedBuildings();
    };
  }, []);

  return { buildings, setBuildings, deletedBuildings, setDeletedBuildings, createFirestore, archiveFirestore, updateFirestore, deleteFirestore, readFirestore, readFirestores, readFirestoresRealTime };
};
