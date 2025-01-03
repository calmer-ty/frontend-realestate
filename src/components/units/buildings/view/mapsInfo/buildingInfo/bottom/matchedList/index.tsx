import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";
import { DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE } from "@/src/commons/constants";

import Image from "next/image";
import Link from "next/link";
import BasicUnImage from "@/src/components/commons/unImages/basic";

import type { IMatchedListProps } from "./types";
import * as S from "./styles";

export default function MatchedList(props: IMatchedListProps): JSX.Element {
  return (
    <S.List>
      {props.matchedData.map((el, index) => (
        <li key={`${el.type}_${el.address}_${index}`}>
          <Link href={`/${props.buildingType}/${el._id}`}>
            {el.imageUrls?.[0] !== undefined ? (
              <Image src={el.imageUrls?.[0] ?? DEFAULT_STRING_VALUE} width={80} height={80} alt={el._id ?? DEFAULT_STRING_VALUE} unoptimized />
            ) : (
              <BasicUnImage width="80px" height="80px" fontSize="24px" />
            )}
            <p>
              <strong>
                매매 {isBillion(el.price ?? DEFAULT_NUMBER_VALUE)}
                {isTenMillion(el.price ?? DEFAULT_NUMBER_VALUE)}원
              </strong>
              <br />
              {el.type}・{el.addressDetail}
              <br />
              {el.floor}층, {el.area}m², 관리비 {el.manageCost}만원
            </p>
          </Link>
        </li>
      ))}
    </S.List>
  );
}
