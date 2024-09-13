import { useCallback } from "react";
import { db } from "@/src/commons/libraries/firebase/firebaseApp";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import type { IFirebaseData, IUseFirebaseProps } from "@/src/commons/types";
import type { IWriteFormData } from "@/src/components/units/buildings/write/types";

const convertFirebaseData = (data: DocumentData): IFirebaseData => {
  return {
    _id: data._id as string,
    type: data.type as string,
    address: data.address as string,
    addressDetail: data.addressDetail as string,
    floor: data.floor as number,
    area: data.area as number,
    price: data.price as number,
    roomCount: data.roomCount as number,
    bathroomCount: data.bathroomCount as number,
    imageUrls: data.imageUrls as string[],
    manageCost: data.number as number,
    desc: data.desc as string,
    // prettier-ignore
    user: data.user !== undefined ? {
      _id: data.user._id as string,
      name: data.user.name as string,
      email: data.user.email as string,
    }: undefined,
    // prettier-ignore
    createdAt: data.createdAt !== undefined ? {
      seconds: data.seconds as  number,
      nanoseconds: data.nanoseconds as  number,
    }: undefined,
  };
};

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

  const readFirebaseData = useCallback(async (collection: string, docId: string) => {
    const docRef = doc(db, collection, docId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data !== null && data !== undefined) {
          return convertFirebaseData(data);
        }
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }, []);

  const readFirebaseDatas = useCallback(async (buildingType: string): Promise<IFirebaseData[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, buildingType));
      const datas = querySnapshot.docs.map((el) => el.data() as IFirebaseData);
      // console.log("Document datas:", datas);
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
