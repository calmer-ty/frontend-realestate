"use client";

import { useEffect, useState } from "react";
import { useFirestore } from "@/src/commons/hooks/firebase/useFirestore";

import LoadingSpinner from "@/src/components/commons/loadingSpinner";
import BuildingDetailTop from "./top";
import BuildingDetailBottom from "./bottom";

import * as S from "./styles";
import type { IBuildingListParamsProps, IFirestore } from "@/src/commons/types";

export default function BuildingDetail({ params }: IBuildingListParamsProps): JSX.Element {
  const [listId, setListId] = useState<string | undefined>(undefined);

  // params를 비동기적으로 처리하려면 await로 기다려야 함
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const resolvedParams = params; // Promise가 있을 경우에만 await 사용
      setListId(resolvedParams.listId);
    };
    void fetchData();
  }, [params]);

  const [buildingData, setBuildingData] = useState<IFirestore | undefined>(undefined);
  const { readFirestore } = useFirestore();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (listId === undefined) {
          console.warn("listId 값을 찾을 수 없습니다.");
          return;
        }
        // readFirestores를 통해 Firestore에서 데이터 가져오기
        const buildings = await readFirestore("buildings", listId);
        if (buildings !== undefined) {
          setBuildingData(buildings);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    void fetchData();
  }, [listId, readFirestore]);

  if (buildingData === undefined) {
    return <LoadingSpinner />; // 로딩 상태 표시
  }

  return (
    <S.Container>
      <BuildingDetailTop buildingData={buildingData} />
      <BuildingDetailBottom buildingData={buildingData} />
    </S.Container>
  );
}
