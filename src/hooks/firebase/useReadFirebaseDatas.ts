import { useEffect, useState } from "react";
import { db } from "@/src/commons/libraries/firebase/firebaseApp";
import { collection, getDocs } from "firebase/firestore";
import type { IFirebaseData } from "@/src/commons/types";

export const useReadFirebaseDatas = (buildingType: string): IFirebaseData[] => {
  const [firebaseDatas, setFirebaseDatas] = useState<IFirebaseData[]>([]);

  useEffect(() => {
    const fetchBuildings = async (): Promise<void> => {
      try {
        const querySnapshot = await getDocs(collection(db, buildingType));
        const datas: IFirebaseData[] = querySnapshot.docs.map((el) => el.data() as IFirebaseData);
        setFirebaseDatas(datas);
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };

    void fetchBuildings();
  }, [buildingType]);

  return firebaseDatas;
};
