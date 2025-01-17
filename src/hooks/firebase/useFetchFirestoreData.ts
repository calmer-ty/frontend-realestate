import { useEffect, useState } from "react";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import type { IFirestore } from "@/src/commons/types";

interface IUseFetchFirestoreDataReturn {
  firestoreDatas: IFirestore[];
}

export const useFetchFirestoreData = (colName: string): IUseFetchFirestoreDataReturn => {
  const [firestoreDatas, setFirestoreDatas] = useState<IFirestore[]>([]);
  const { readFirestores } = useFirestore();

  useEffect(() => {
    const readBuilding = async (): Promise<void> => {
      const data = await readFirestores(colName);
      setFirestoreDatas(data);
    };
    void readBuilding();
  }, [readFirestores, colName]);

  return { firestoreDatas };
};
