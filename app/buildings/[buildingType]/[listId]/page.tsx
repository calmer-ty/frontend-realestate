"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/commons/libraries/firebase/firebaseApp";
import BuildingDetail from "@/src/components/units/buildings/detail";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";
import type { IBuildingListParams, IFirebaseData } from "@/src/commons/types";

export default function BuildingDetailPage({ params }: { params: IBuildingListParams }): JSX.Element {
  const { buildingType, listId } = params;
  const [buildingData, setBuildingData] = useState<IFirebaseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const docRef = doc(db, buildingType, listId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBuildingData(docSnap.data() as IFirebaseData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching documents: ", error);
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, [buildingType, listId]);

  if (loading) {
    return <LoadingSpinner size={100} />;
  }

  if (buildingData === null) {
    return <div>Error fetching document.</div>;
  }

  return <BuildingDetail buildingData={buildingData} />;
}
