import { engToKor } from "@/src/commons/libraries/utils/convertCollection";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";

import Link from "next/link";
import Image from "next/image";
import BasicUnImage from "../../../../commons/unImages/basic";

import { DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import type { IRecommendedListItemProps } from "../types";
import * as S from "./styles";

export default function ListItem(props: IRecommendedListItemProps): JSX.Element {
  return (
    <S.ListItem key={props.el._id}>
      <Link href={`/${props.el.type}/${props.el._id}`}>
        {props.el.imageUrls?.[0] !== undefined ? (
          <Image src={props.el.imageUrls?.[0] ?? DEFAULT_STRING_VALUE} alt={props.el.type ?? DEFAULT_STRING_VALUE} width={300} height={180} unoptimized />
        ) : (
          <BasicUnImage width="300px" height="180px" fontSize="36px" />
        )}
        <p className="buildingDesc">
          <span>
            {engToKor(props.el.type ?? DEFAULT_STRING_VALUE)}・{props.el.addressDetail}
          </span>
          <strong>
            매매 {isBillion(props.el.price ?? DEFAULT_NUMBER_VALUE)}
            {isTenMillion(props.el.price ?? DEFAULT_NUMBER_VALUE)} 원
          </strong>
          <span>
            {props.el.floor}층・{props.el.area}m²・관리비 {props.el.manageCost}만
          </span>
        </p>
      </Link>
    </S.ListItem>
  );
}
