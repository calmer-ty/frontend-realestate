import { engToKor } from "@/src/commons/libraries/utils/convertCollection";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";
import { DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE } from "@/src/commons/constants";

import type { IItemInfoProps } from "./types";
import * as S from "./styles";

// 가격 포맷팅 함수 분리
const formatPrice = (price: number): string => {
  return price === 0 ? `${isBillion(price)}억` : isTenMillion(price ?? DEFAULT_NUMBER_VALUE) + "원";
};

export default function ItemInfo(props: IItemInfoProps): JSX.Element {
  const { el } = props;
  return (
    <S.Container>
      <h3>
        <p>
          {engToKor(el.type ?? DEFAULT_STRING_VALUE)} - 방 {el.roomCount}개, 욕실 {el.bathroomCount}개
        </p>
        <p className="price">매매 {formatPrice(el.price ?? DEFAULT_NUMBER_VALUE)}</p>
      </h3>
      <p className="address">
        {el.address} {el.addressDetail}
      </p>
      <p className="desc">{el.desc}</p>
    </S.Container>
  );
}
