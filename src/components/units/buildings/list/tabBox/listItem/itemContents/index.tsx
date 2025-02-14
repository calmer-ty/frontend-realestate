import { getTransactionText } from "@/src/commons/libraries/utils/priceFormatter";
import { convertTimestamp } from "@/src/commons/libraries/utils/convertTimestamp";

import Image from "next/image";
import BasicUnImage from "@/src/components/commons/unImage/basic";

import * as S from "./styles";

import type { IFirestore } from "@/src/commons/types";
interface IItemInfoProps {
  el: IFirestore;
  isDeleted: boolean;
}

// 가격 포맷팅 함수 분리

// 날짜 포맷팅 함수 분리
const formatDate = (timestamp: number): string => {
  const { year, month, day, hours, minutes, seconds } = convertTimestamp(timestamp);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default function ItemContents({ el, isDeleted }: IItemInfoProps): JSX.Element {
  return (
    <S.Container>
      {/* prettier-ignore */}
      <figure>
        {el.imageUrls?.[0] !== undefined 
        ? (<Image src={el.imageUrls?.[0] ?? ""} alt={el.address} fill  style={{ objectFit: "cover"}} unoptimized/>) 
        : (<BasicUnImage width="100%" height="100%" fontSize="1.75rem" />)}
      </figure>
      {/* prettier-ignore */}
      <div className="itemInfo">
        <h3>
          {el.buildingType} - 방 {el.roomCount}개, 욕실 {el.bathroomCount}개
        </h3>
          <strong className="price">{getTransactionText(el.transactionType, el.price, el.rent)}</strong>
        <span className="address">{`${el.address} ${el.addressDetail}`}</span>
        <span className="desc">{el.desc}</span>
      </div>
      <div className="itemAd">
        <h3>광고 정보</h3>
        {isDeleted && (
          <div className="adEnd">
            <span>광고 종료: </span>
            {formatDate(el.deletedAt?.seconds)}
          </div>
        )}
        {/* <p>
                <span>광고 기한: </span>
                {formatDate((el.createdAt?.seconds ?? DEFAULT_NUMBER_VALUE) + DAY_LIMIT)}
              </p> */}
        <p>
          <span>광고 시작: </span>
          {formatDate(el.createdAt?.seconds)}
        </p>
      </div>
    </S.Container>
  );
}
