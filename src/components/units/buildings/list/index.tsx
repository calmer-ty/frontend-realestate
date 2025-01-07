"use client";

import { useState } from "react";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import { useBuildingList } from "./hooks/useBuildingList";

import DeleteModal from "./deleteModal";
import TabBox from "./tabBox";

import type { IFirestore } from "@/src/commons/types";
import * as S from "./styles";

export default function BuildingList(): JSX.Element {
  const [buildings, setBuildings] = useState<IFirestore[]>([]);
  const [deletedBuildings, setDeletedBuildings] = useState<IFirestore[]>([]);

  const { archiveFirestore, deleteFirestore, readFirestores } = useFirestore();
  useBuildingList(setBuildings, setDeletedBuildings, readFirestores);

  // 삭제 모달
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<IFirestore | null>(null);

  const onDeleteModalOpen = (building: IFirestore): void => {
    setSelectedBuilding(building); // 클릭된 매물 데이터 저장
    setModalOpen(true); // 모달 열기
  };

  return (
    <>
      <S.Container>
        <TabBox myBuildings={buildings} myDeletedBuildings={deletedBuildings} onDeleteModalOpen={onDeleteModalOpen} />
      </S.Container>

      {/* 매물 삭제 모달 */}
      <DeleteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        buildings={buildings}
        setBuildings={setBuildings}
        setDeletedBuildings={setDeletedBuildings}
        archiveFirestore={archiveFirestore}
        deleteFirestore={deleteFirestore}
        readFirestores={readFirestores}
        selectedBuilding={selectedBuilding}
      />
    </>
  );
}
