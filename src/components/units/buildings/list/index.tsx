"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { useState } from "react";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import { useBuildingList } from "./hooks/useBuildingList";

import LoadingSpinner from "@/src/components/commons/loadingSpinner";
import DeleteModal from "./deleteModal";
import TabBox from "./tabBox";

import type { IFirestore } from "@/src/commons/types";
import * as S from "./styles";

export default function BuildingList(): JSX.Element {
  const { user } = useAuth();
  const userId = user?.uid;

  const { buildings, deletedBuildings, setBuildings, archiveFirestore, deleteFirestore, readFirestoresRealTime } = useFirestore();
  const { myBuildings, myDeletedBuildings } = useBuildingList(buildings, deletedBuildings, userId, archiveFirestore, deleteFirestore, readFirestoresRealTime);

  // 삭제 모달
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<IFirestore | null>(null);

  const onDeleteModalOpen = (building: IFirestore): void => {
    setSelectedBuilding(building); // 클릭된 매물 데이터 저장
    setModalOpen(true); // 모달 열기
  };

  return (
    <>
      <S.Container>{user !== null ? <TabBox myBuildings={myBuildings} myDeletedBuildings={myDeletedBuildings} onDeleteModalOpen={onDeleteModalOpen} /> : <LoadingSpinner size={100} />}</S.Container>

      {/* 매물 삭제 모달 */}
      <DeleteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setBuildings={setBuildings}
        archiveFirestore={archiveFirestore}
        deleteFirestore={deleteFirestore}
        selectedBuilding={selectedBuilding}
      />
    </>
  );
}
