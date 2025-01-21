import { formatPrice } from "@/src/commons/libraries/utils/priceFormatter";
import { engToKor } from "@/src/commons/libraries/utils/convertCollection";

import Image from "next/image";
import Link from "next/link";
import BasicUnImage from "@/src/components/commons/unImages/basic";

import { DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import * as S from "./styles";

import type { IFirestore } from "@/src/commons/types";
interface IMatchedListProps {
  matchedDatas: IFirestore[];
}

export default function MatchedList(props: IMatchedListProps): JSX.Element {
  const { matchedDatas } = props;
  return (
    <S.List>
      {matchedDatas.map((el, index) => (
        <li key={`${el.type}_${el.address}_${index}`}>
          <Link href={`/${el.type}/${el._id}`}>
            {el.imageUrls?.[0] !== undefined ? (
              <Image src={el.imageUrls?.[0] ?? DEFAULT_STRING_VALUE} width={80} height={80} alt={el._id ?? DEFAULT_STRING_VALUE} unoptimized />
            ) : (
              <BasicUnImage width="80px" height="80px" fontSize="24px" />
            )}
            <p>
              <strong>매매 {formatPrice(el.price ?? DEFAULT_NUMBER_VALUE)}</strong>
              <br />
              {engToKor(el.type ?? DEFAULT_STRING_VALUE)}・{el.addressDetail}
              <br />
              {el.floor}층, {el.area}m², 관리비 {el.manageCost}만원
            </p>
          </Link>
        </li>
      ))}
    </S.List>
  );
}
