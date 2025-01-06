import { engToKor } from "@/src/commons/libraries/utils/convertCollection";
import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";

import { Button } from "@mui/material";
import BasicModal from "@/src/components/commons/modal/basic";

import type { IDeleteModalProps } from "./types";
import * as S from "./styles";

export default function DeleteModal(props: IDeleteModalProps): JSX.Element {
  const { readFirestores, deleteFirestore, archiveFirestore, setBuildings, setDeletedBuildings, setModalOpen } = props;
  const onModalToggle = (): void => {
    props.setModalOpen((prev) => !prev);
  };

  const onDeleteBuildingItem = async (): Promise<void> => {
    if (props.selectedBuilding !== null) {
      // 1. Firestore에서 데이터 삭제 및 동기화
      await deleteFirestore("buildings", props.selectedBuilding._id ?? DEFAULT_STRING_VALUE);
      // 2. 삭제된 데이터 아카이브
      await archiveFirestore(props.selectedBuilding, "deleted_buildings");
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
    <BasicModal open={props.modalOpen} onToggle={onModalToggle}>
      {props.selectedBuilding !== null ? (
        <S.ModalInner>
          <div className="top">
            <h2>이 매물을 삭제하시겠습니까? </h2>
            <p>
              {engToKor(props.selectedBuilding.type ?? DEFAULT_STRING_VALUE)} - {props.selectedBuilding.address}
              {props.selectedBuilding.addressDetail}
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
