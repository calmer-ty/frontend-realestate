import { formatPrice } from "@/src/commons/libraries/utils/priceFormatter";
import { engToKor } from "@/src/commons/libraries/utils/convertCollection";

import Image from "next/image";
import Link from "next/link";
import BasicUnImage from "@/src/components/commons/unImages/basic";

import { DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import * as S from "./styles";

import type { IUserInputGeocodeData } from "@/src/commons/types";
interface IMatchedListProps {
  matchedDatas: IUserInputGeocodeData[];
}

export default function MatchedList(props: IMatchedListProps): JSX.Element {
  const { matchedDatas } = props;
  return (
    <S.List>
      {matchedDatas.map((el, index) => (
        <li key={`${el.data.type}_${el.data.address}_${index}`}>
          <Link href={`/${el.data.type}/${el.data._id}`}>
            {el.data.imageUrls?.[0] !== undefined ? (
              <Image src={el.data.imageUrls?.[0] ?? DEFAULT_STRING_VALUE} width={80} height={80} alt={el.data._id ?? DEFAULT_STRING_VALUE} unoptimized />
            ) : (
              <BasicUnImage width="80px" height="80px" fontSize="24px" />
            )}
            <p>
              <strong>매매 {formatPrice(el.data.price ?? DEFAULT_NUMBER_VALUE)}</strong>
              <br />
              {engToKor(el.data.type ?? DEFAULT_STRING_VALUE)}・{el.data.addressDetail}
              <br />
              {el.data.floor}층, {el.data.area}m², 관리비 {el.data.manageCost}만원
            </p>
          </Link>
        </li>
      ))}
    </S.List>
  );
}
