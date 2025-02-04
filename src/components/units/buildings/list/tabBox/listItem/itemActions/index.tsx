import { korToEng } from "@/src/commons/libraries/utils/convertCollection";

import Link from "next/link";
import { Button } from "@mui/material";

import * as S from "./styles";

import type { IFirestore } from "@/src/commons/types";
interface IItemActionsProps {
  isDeleted: boolean;
  el: IFirestore;
  index: number;
  onDeleteModalOpen?: (building: IFirestore) => void;
}

export default function ItemActions(props: IItemActionsProps): JSX.Element {
  const { el, index, isDeleted, onDeleteModalOpen } = props;
  return (
    <S.Container>
      {!isDeleted && (
        <>
          <span>No. {index}</span>
          <div className="buttonWrap">
            <Link href={`/${korToEng(el.buildingType)}/${el._id}/edit/`}>
              <Button variant="outlined">수정</Button>
            </Link>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                onDeleteModalOpen?.(el);
              }}
            >
              삭제
            </Button>
          </div>
        </>
      )}
    </S.Container>
  );
}
