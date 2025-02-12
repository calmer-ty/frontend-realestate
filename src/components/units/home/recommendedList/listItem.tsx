import { formatPrice, getTransactionText } from "@/src/commons/libraries/utils/priceFormatter";
import { korToEng } from "@/src/commons/libraries/utils/convertCollection";

import Link from "next/link";
import Image from "next/image";
import BasicUnImage from "../../../commons/unImage/basic";

import * as S from "./styles";

import type { IFirestore } from "@/src/commons/types";
interface IRecommendedListItemProps {
  el: IFirestore;
}

export default function ListItem({ el }: IRecommendedListItemProps): JSX.Element {
  return (
    <S.ListItem key={el._id}>
      <Link href={`/${korToEng(el.buildingType)}/${el._id}`}>
        <div className="imgWrap">
          {el.imageUrls?.[0] !== undefined ? <Image src={el.imageUrls?.[0]} alt={el.buildingType} layout="fill" unoptimized /> : <BasicUnImage width="16rem" height="10rem" fontSize="2.25rem" />}
        </div>
        <p className="buildingDesc">
          <span>
            {el.buildingType}・{el.addressDetail}
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
