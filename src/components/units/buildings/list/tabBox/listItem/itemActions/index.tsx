import Link from "next/link";
import { Button } from "@mui/material";

import type { IItemActionsProps } from "./types";
import * as S from "./styles";

export default function ItemActions(props: IItemActionsProps): JSX.Element {
  const { el, isDeleted, onDeleteModalOpen } = props;
  return (
    <S.Container>
      {!isDeleted && (
        <>
          <Link href={`/${el.type}/${el._id}/edit/`}>
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
        </>
      )}
    </S.Container>
  );
}
