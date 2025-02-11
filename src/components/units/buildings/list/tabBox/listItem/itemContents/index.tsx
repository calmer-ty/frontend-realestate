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
      <div className="imgWrap">
        {el.imageUrls?.[0] !== undefined 
        ? (<Image src={el.imageUrls?.[0] ?? ""} alt={el.address} fill unoptimized objectFit="cover"/>) 
        : (<BasicUnImage width="12.5rem" height="7.5rem" fontSize="1.75rem" />)}
      </div>
      {/* prettier-ignore */}
      <div className="itemInfo">
        <h3>
          <p>{el.buildingType} - 방 {el.roomCount}개, 욕실 {el.bathroomCount}개</p>
          <p className="price">{getTransactionText(el.transactionType, el.price, el.rent)}</p>
        </h3>
        <p className="address">{`${el.address} ${el.addressDetail}`}</p>
        <p className="desc">{el.desc}</p>
      </div>
      <div className="itemAd">
        <h3>광고 정보</h3>
        {isDeleted && (
          <p className="adEnd">
            <span>광고 종료: </span>
            {formatDate(el.deletedAt?.seconds)}
          </p>
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
