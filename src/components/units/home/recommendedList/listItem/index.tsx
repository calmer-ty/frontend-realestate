import { engToKor } from "@/src/commons/libraries/utils/convertCollection";
import { formatPrice } from "@/src/commons/libraries/utils/priceFormatter";

import Link from "next/link";
import Image from "next/image";
import BasicUnImage from "../../../../commons/unImages/basic";

import { DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import * as S from "./styles";

import type { IFirestore } from "@/src/commons/types";
interface IRecommendedListItemProps {
  el: IFirestore;
}

export default function ListItem(props: IRecommendedListItemProps): JSX.Element {
  const { el } = props;
  return (
    <S.ListItem key={el._id}>
      <Link href={`/${el.type}/${el._id}`}>
        {el.imageUrls?.[0] !== undefined ? (
          <Image src={el.imageUrls?.[0] ?? DEFAULT_STRING_VALUE} alt={el.type ?? DEFAULT_STRING_VALUE} width={300} height={180} unoptimized />
        ) : (
          <BasicUnImage width="300px" height="180px" fontSize="36px" />
        )}
        <p className="buildingDesc">
          <span>
            {engToKor(el.type ?? DEFAULT_STRING_VALUE)}・{el.addressDetail}
          </span>
          <strong>매매 {formatPrice(el.price ?? DEFAULT_NUMBER_VALUE)}</strong>
          <span>
            {el.floor}층・{el.area}m²・관리비 {el.manageCost}만
          </span>
        </p>
      </Link>
    </S.ListItem>
  );
}
