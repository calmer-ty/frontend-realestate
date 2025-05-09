import { formatPrice, getTransactionText } from "@/src/commons/libraries/utils/priceFormatter";
import { korToEng } from "@/src/commons/libraries/utils/convertCollection";

import Link from "next/link";
import Image from "next/image";
import BasicUnImage from "@/src/components/commons/unImage/basic";

import * as S from "./styles";

import type { IFirestore } from "@/src/commons/types";
interface IRecommendedListItemProps {
  el: IFirestore;
}

export default function ListItem({ el }: IRecommendedListItemProps): JSX.Element {
  return (
    <S.ListItem key={el._id}>
      <Link href={`/${korToEng(el.buildingType)}/${el._id}`}>
        <figure>
          {el.imageUrls?.[0] !== undefined ? (
            <Image src={el.imageUrls?.[0]} alt={el.buildingType} fill sizes="100%" style={{ objectFit: "cover" }} unoptimized />
          ) : (
            <BasicUnImage width="100%" height="100%" fontSize="2.25rem" />
          )}
        </figure>
        <figcaption>
          <span>
            {el.buildingType}・{el.addressDetail}
          </span>
          <strong>{getTransactionText(el.transactionType, el.price, el.rent)}</strong>
          <span>
            {el.floor}층・{el.area}m²・관리비 {formatPrice(el.manageCost)}
          </span>
        </figcaption>
      </Link>
    </S.ListItem>
  );
}
