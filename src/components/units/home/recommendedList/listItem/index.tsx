import { formatPrice, getTransactionText } from "@/src/commons/libraries/utils/priceFormatter";

import Link from "next/link";
import Image from "next/image";
import BasicUnImage from "../../../../commons/unImages/basic";

import * as S from "./styles";

import type { IFirestore } from "@/src/commons/types";
import { engToKor } from "@/src/commons/libraries/utils/convertCollection";
interface IRecommendedListItemProps {
  el: IFirestore;
}

export default function ListItem(props: IRecommendedListItemProps): JSX.Element {
  const { el } = props;

  return (
    <S.ListItem key={el._id}>
      <Link href={`/${el.buildingType}/${el._id}`}>
        {el.imageUrls?.[0] !== undefined ? <Image src={el.imageUrls?.[0]} alt={el.buildingType} width={300} height={180} unoptimized /> : <BasicUnImage width="300px" height="180px" fontSize="36px" />}
        <p className="buildingDesc">
          <span>
            {engToKor(el.buildingType)}・{el.addressDetail}
          </span>
          <strong>{getTransactionText(el.transactionType, el.price, el.rent)}</strong>
          <span>
            {el.floor}층・{el.area}m²・관리비 {formatPrice(el.manageCost)}
          </span>
        </p>
      </Link>
    </S.ListItem>
  );
}
