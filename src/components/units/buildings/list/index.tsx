"use client";

import { useState } from "react";
import { useUserBuildings } from "./hooks/useUserBuildings";
import { useDeleteModal } from "./hooks/useDeleteModal";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";

import DeleteModal from "./deleteModal";
import TabBox from "./tabBox";

import * as S from "./styles";
import type { IFirestore } from "@/src/commons/types";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

export default function BuildingList(): JSX.Element {
  const [buildings, setBuildings] = useState<IFirestore[]>([]);
  const [deletedBuildings, setDeletedBuildings] = useState<IFirestore[]>([]);

  const { archiveFirestore, deleteFirestore, readFirestores } = useFirestore();
  useUserBuildings({ setBuildings, setDeletedBuildings, readFirestores });

  const { modalOpen, setModalOpen, selectedBuilding, onDeleteModalOpen } = useDeleteModal();
  return (
    <>
      <S.Container>
        {buildings.length === 0 && buildings.length === 0 ? (
          <LoadingSpinner size={100} />
        ) : (
          <TabBox myBuildings={buildings} myDeletedBuildings={deletedBuildings} onDeleteModalOpen={onDeleteModalOpen} />
        )}
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
