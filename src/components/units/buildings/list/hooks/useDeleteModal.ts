import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { IFirestore } from "@/src/commons/types";
interface IUseDeleteModalReturn {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedBuilding: IFirestore | null;
  onDeleteModalOpen: (building: IFirestore) => void;
}
export const useDeleteModal = (): IUseDeleteModalReturn => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<IFirestore | null>(null);

  const onDeleteModalOpen = (building: IFirestore): void => {
    setSelectedBuilding(building); // 클릭된 매물 데이터 저장
    setModalOpen(true); // 모달 열기
  };

  return {
    modalOpen,
    setModalOpen,
    selectedBuilding,
    onDeleteModalOpen,
  };
};
