import { useEffect, useState } from "react";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import type { IFirestore } from "@/src/commons/types";

interface IUseFetchFirestoreDataReturn {
  firestoreData: IFirestore[];
}

export const useFetchFirestoreData = (colName: string): IUseFetchFirestoreDataReturn => {
  const [firestoreData, setFirestoreData] = useState<IFirestore[]>([]);
  const { readFirestores } = useFirestore();

  useEffect(() => {
    const readBuilding = async (): Promise<void> => {
      const data = await readFirestores(colName);
      setFirestoreData(data);
    };
    void readBuilding();
  }, [readFirestores, colName]);

  return { firestoreData };
};
