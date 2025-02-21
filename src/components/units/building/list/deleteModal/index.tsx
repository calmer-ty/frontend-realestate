import { Button } from "@mui/material";
import BasicModal from "@/src/components/commons/modal/basic";

import * as S from "./styles";

import type { Dispatch, SetStateAction } from "react";
import type { IFirestore } from "@/src/commons/types";
interface IDeleteModalProps {
  selectedBuilding: IFirestore | undefined;
  buildings: IFirestore[];
  setBuildings: Dispatch<SetStateAction<IFirestore[]>>;
  setDeletedBuildings: Dispatch<SetStateAction<IFirestore[]>>;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  archiveFirestore: (data: IFirestore, colName: string) => Promise<void>;
  deleteFirestore: (colName: string, docId: string) => Promise<void>;
  readFirestores: (colName: string) => Promise<IFirestore[]>;
}

export default function DeleteModal({
  modalOpen,
  selectedBuilding,
  readFirestores,
  deleteFirestore,
  archiveFirestore,
  setBuildings,
  setDeletedBuildings,
  setModalOpen,
}: IDeleteModalProps): JSX.Element {
  const onModalToggle = (): void => {
    setModalOpen((prev) => !prev);
  };

  const onDeleteBuildingItem = async (): Promise<void> => {
    if (selectedBuilding !== undefined) {
      // 1. Firestore에서 데이터 삭제 및 동기화
      await deleteFirestore("buildings", selectedBuilding._id);
      // 2. 삭제된 데이터 아카이브
      await archiveFirestore(selectedBuilding, "deleted_buildings");
      // 3. 데이터 갱신을 위해 다시 리스토어
      const updatedBuildings = await readFirestores("buildings"); // "apartment"는 필요에 맞게 변경
      const updatedDeletedBuildings = await readFirestores("deleted_buildings"); // "apartment"는 필요에 맞게 변경
      setBuildings(updatedBuildings); // 상태 갱신
      setDeletedBuildings(updatedDeletedBuildings); // 상태 갱신

      // 모달 닫기
      setModalOpen(false);
    }
  };

  return (
    <BasicModal open={modalOpen} onClose={onModalToggle}>
      {selectedBuilding !== null ? (
        <S.ModalInner>
          <div className="top">
            <h3>이 매물을 삭제하시겠습니까?</h3>
            <p>
              {selectedBuilding?.buildingType} - {selectedBuilding?.address} {selectedBuilding?.addressDetail}
            </p>
          </div>
          <div className="buttonWrap">
            <Button type="button" variant="outlined" onClick={onModalToggle}>
              취소
            </Button>
            <Button variant="contained" color="error" onClick={onDeleteBuildingItem}>
              삭제
            </Button>
          </div>
        </S.ModalInner>
      ) : null}
    </BasicModal>
  );
}
