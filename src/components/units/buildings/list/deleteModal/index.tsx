import { engToKor } from "@/src/commons/libraries/utils/convertCollection";
import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";

import { Button } from "@mui/material";
import BasicModal from "@/src/components/commons/modal/basic";

import type { IDeleteModalProps } from "./types";
import * as S from "./styles";

export default function DeleteModal(props: IDeleteModalProps): JSX.Element {
  const onModalToggle = (): void => {
    props.setModalOpen((prev) => !prev);
  };

  const onDeleteBuildingItem = (): void => {
    if (props.selectedBuilding !== null) {
      // 1. 먼저 상태를 클라이언트에서 업데이트 (성능 최적화)
      props.setBuildings((prev) => prev.filter((el) => el._id !== props.selectedBuilding?._id));

      // 3. 삭제된 데이터에 저장
      void props.archiveFirestore(props.selectedBuilding);
      // 4. Firestore에서 데이터 삭제 및 동기화
      void props
        .deleteFirestore(props.selectedBuilding.type ?? DEFAULT_STRING_VALUE, props.selectedBuilding._id ?? DEFAULT_STRING_VALUE)
        .then(() => {
          // 3. Firestore와 동기화 후 데이터를 다시 가져오면 좋음
          void props.fetchData();
        })
        .catch((error) => {
          console.error(`Error deleting document ${props.selectedBuilding?._id}:`, error);
        });

      // 모달 닫기
      props.setModalOpen(false);
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
