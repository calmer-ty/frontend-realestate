import Link from "next/link";

import ItemActions from "./itemActions";
import ItemContents from "./itemContents";

import * as S from "./styles";

import type { IFirestore } from "@/src/commons/types";
interface IBuildingListItemProps {
  isDeleted: boolean;
  el: IFirestore;
  index: number;
  onDeleteModalOpen?: (building: IFirestore) => void;
}

export default function ListItem(props: IBuildingListItemProps): JSX.Element {
  const { el, index, isDeleted, onDeleteModalOpen } = props;
  return (
    <S.ListItem>
      <ItemActions el={el} index={index} isDeleted={isDeleted} onDeleteModalOpen={onDeleteModalOpen} />
      {isDeleted ? (
        <ItemContents el={el} isDeleted={isDeleted} />
      ) : (
        <Link href={`/${props.el.type}/${props.el._id}`}>
          <ItemContents el={el} isDeleted={isDeleted} />
        </Link>
      )}
    </S.ListItem>
  );
}
