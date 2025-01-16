"use client";

import { useEffect, useState } from "react";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";

import BuildingDetail from "@/src/components/units/buildings/detail";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import type { IBuildingListParams, IFirestore } from "@/src/commons/types";

export default function BuildingDetailPage({ params }: { params: IBuildingListParams }): JSX.Element {
  const { listId } = params;
  const [buildings, setBuildings] = useState<IFirestore | null>(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const { readFirestore } = useFirestore();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // readFirestores를 통해 Firestore에서 데이터 가져오기
        const buildings = await readFirestore("buildings", listId);
        if (buildings !== undefined) {
          setBuildings(buildings);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false); // 로딩 상태 완료
      }
    };

    void fetchData();
  }, [listId, readFirestore]);

  if (loading) {
    return <LoadingSpinner size={100} />; // 로딩 상태 표시
  }

  if (buildings === null) {
    return <div>Error fetching document.</div>;
  }

  return <BuildingDetail buildingData={buildings} />;
}
