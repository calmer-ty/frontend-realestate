import Link from "next/link";

import ItemActions from "./itemActions";
import ItemAd from "./itemAd";
import ItemInfo from "./itemInfo";
import ItemImage from "./itemImage";

import type { IBuildingListItemProps } from "./types";
import * as S from "./styles";

export default function ListItem(props: IBuildingListItemProps): JSX.Element {
  const { el, index, isDeleted, onDeleteModalOpen } = props;
  return (
    <S.ListItem>
      <ItemActions el={el} isDeleted={isDeleted} onDeleteModalOpen={onDeleteModalOpen} />
      {isDeleted ? (
        <div className="bottomContents">
          {/* Link가 아닌 단순한 div로 대체 */}
          <p>{index}</p>
          <ItemImage el={el} />
          <ItemInfo el={el} />
          <ItemAd el={el} isDeleted={isDeleted} />
        </div>
      ) : (
        <Link href={`/${props.el.type}/${props.el._id}`}>
          <div className="bottomContents">
            <p>{index}</p>
            <ItemImage el={el} />
            <ItemInfo el={el} />
            <ItemAd el={el} isDeleted={isDeleted} />
          </div>
        </Link>
      )}
    </S.ListItem>
  );
}
