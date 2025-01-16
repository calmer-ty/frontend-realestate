import Link from "next/link";

import ItemActions from "./itemActions";
import ItemAd from "./itemAd";
import ItemInfo from "./itemInfo";
import ItemImage from "./itemImage";

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
        <div className="bottomContents">
          {/* Link가 아닌 단순한 div로 대체 */}
          <ItemImage el={el} />
          <ItemInfo el={el} />
          <ItemAd el={el} isDeleted={isDeleted} />
        </div>
      ) : (
        <Link href={`/${props.el.type}/${props.el._id}`}>
          <div className="bottomContents">
            <ItemImage el={el} />
            <ItemInfo el={el} />
            <ItemAd el={el} isDeleted={isDeleted} />
          </div>
        </Link>
      )}
    </S.ListItem>
  );
}
