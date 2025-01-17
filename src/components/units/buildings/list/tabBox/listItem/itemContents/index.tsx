import { engToKor } from "@/src/commons/libraries/utils/convertCollection";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";
import { convertTimestamp } from "@/src/commons/libraries/utils/convertTimestamp";

import Image from "next/image";
import BasicUnImage from "@/src/components/commons/unImages/basic";

import { DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import * as S from "./styles";

import type { IFirestore } from "@/src/commons/types";
interface IItemInfoProps {
  el: IFirestore;
  isDeleted: boolean;
}

// 가격 포맷팅 함수 분리
const formatPrice = (price: number): string => {
  return price === 0 ? `${isBillion(price)}억` : isTenMillion(price ?? DEFAULT_NUMBER_VALUE) + "원";
};
// 날짜 포맷팅 함수 분리
const formatDate = (timestamp: number): string => {
  const { year, month, day, hours, minutes, seconds } = convertTimestamp(timestamp);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default function ItemContents(props: IItemInfoProps): JSX.Element {
  const { el, isDeleted } = props;
  return (
    <S.Container>
      <div className="itemImage">
        {el.imageUrls?.[0] !== undefined ? (
          <Image src={el.imageUrls?.[0] ?? ""} alt={el.address ?? DEFAULT_STRING_VALUE} fill unoptimized />
        ) : (
          <BasicUnImage width="200px" height="120px" fontSize="28px" />
        )}
      </div>
      <div className="itemInfo">
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
      </div>
      <div className="itemAd">
        <h3>광고 정보</h3>
        {isDeleted && (
          <p className="adEnd">
            <span>광고 종료: </span>
            {formatDate(el.deletedAt?.seconds ?? DEFAULT_NUMBER_VALUE)}
          </p>
        )}
        {/* <p>
                <span>광고 기한: </span>
                {formatDate((el.createdAt?.seconds ?? DEFAULT_NUMBER_VALUE) + DAY_LIMIT)}
              </p> */}
        <p>
          <span>광고 시작: </span>
          {formatDate(el.createdAt?.seconds ?? DEFAULT_NUMBER_VALUE)}
        </p>
      </div>
    </S.Container>
  );
}
