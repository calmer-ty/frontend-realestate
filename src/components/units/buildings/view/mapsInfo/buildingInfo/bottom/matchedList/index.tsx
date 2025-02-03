import { formatPrice, getTransactionText } from "@/src/commons/libraries/utils/priceFormatter";

import Image from "next/image";
import Link from "next/link";
import BasicUnImage from "@/src/components/commons/unImage/basic";

import * as S from "./styles";

import type { IFirestore } from "@/src/commons/types";
import { engToKor } from "@/src/commons/libraries/utils/convertCollection";
interface IMatchedListProps {
  matchedDatas: IFirestore[];
}

export default function MatchedList(props: IMatchedListProps): JSX.Element {
  const { matchedDatas } = props;

  return (
    <S.List>
      {matchedDatas.map((el, index) => (
        <li key={`${el.buildingType}_${el.address}_${index}`}>
          <Link href={`/${el.buildingType}/${el._id}`}>
            {el.imageUrls?.[0] !== undefined ? <Image src={el.imageUrls?.[0]} width={80} height={80} alt={el._id} unoptimized /> : <BasicUnImage width="80px" height="80px" fontSize="24px" />}
            <p>
              <strong>{getTransactionText(el.transactionType, el.price, el.rent)}</strong>
              <span>
                {engToKor(el.buildingType)}・{el.addressDetail}
              </span>
              <span>
                {el.floor}층, {el.area}m², 관리비 {formatPrice(el.manageCost)}
              </span>
            </p>
          </Link>
        </li>
      ))}
    </S.List>
  );
}
