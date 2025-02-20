"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";

import DeleteModal from "./deleteModal";
import TabBox from "./tabBox";

import * as S from "./styles";
import type { IFirestore } from "@/src/commons/types";

export default function BuildingList(): JSX.Element {
  const [buildings, setBuildings] = useState<IFirestore[]>([]);
  const [deletedBuildings, setDeletedBuildings] = useState<IFirestore[]>([]);
  const { archiveFirestore, deleteFirestore, readFirestores } = useFirestore();

  const { user } = useAuth();
  const userId = user?.uid;

  const [loading, setLoading] = useState(true);

  const fetchBuildings = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      // Firebase에서 아파트, 집, 삭제된 아파트 데이터를 가져옴
      const buildings = await readFirestores("buildings");
      const deletedBuildings = await readFirestores("deleted_buildings");

      // 유저 ID에 맞는 건물 필터링
      const userBuildings = buildings.filter((el) => el.user?._id === userId);
      const userDeletedBuildings = deletedBuildings.filter((el) => el.user?._id === userId);

      // 상태 업데이트: 유저 데이터만 설정
      setBuildings(userBuildings);
      setDeletedBuildings(userDeletedBuildings);
    } catch (error) {
      console.error("Error fetching buildings:", error);
    } finally {
      setLoading(false); // 데이터 로딩 완료
    }
  }, [userId, setBuildings, setDeletedBuildings, readFirestores]);

  useEffect(() => {
    if (userId !== undefined) {
      // 컴포넌트가 마운트될 때 데이터 한 번만 불러옴
      void fetchBuildings();
    }
  }, [userId, fetchBuildings]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<IFirestore | undefined>(undefined);

  const onDeleteModalOpen = (building: IFirestore): void => {
    setSelectedBuilding(building); // 클릭된 매물 데이터 저장
    setModalOpen(true); // 모달 열기
  };

  return (
    <>
      <S.Container>
        <TabBox buildings={buildings} deletedBuildings={deletedBuildings} onDeleteModalOpen={onDeleteModalOpen} loading={loading} />
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
