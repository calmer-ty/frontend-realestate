import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";
import { convertTimestamp } from "@/src/commons/libraries/utils/convertTimestamp";
import { DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import { engToKor } from "@/src/commons/libraries/utils/convertCollection";

import Link from "next/link";
import Image from "next/image";
import BasicUnImage from "@/src/components/commons/unImages/basic";
import { Button } from "@mui/material";

import type { IBuildingListItem } from "./types";
import * as S from "./styles";

// 광고기한 초 - 60초 * 60분 * 24시간
export const DAY_LIMIT = 60 * 60 * 24;

// 날짜 포맷팅 함수 분리
const formatDate = (timestamp: number): string => {
  const { year, month, day, hours, minutes, seconds } = convertTimestamp(timestamp);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 가격 포맷팅 함수 분리
const formatPrice = (price: number): string => {
  return price === 0 ? `${isBillion(price)}억` : isTenMillion(price ?? DEFAULT_NUMBER_VALUE) + "원";
};

export default function ListItem(props: IBuildingListItem): JSX.Element {
  const { el, index, isDeleted, onDeleteModalOpen } = props;
  return (
    <S.ListItem>
      {!isDeleted && (
        <div className="topContents">
          <Link href={`/${el.type}/${el._id}/edit/`}>
            <Button variant="outlined">수정</Button>
          </Link>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              onDeleteModalOpen?.(el);
            }}
          >
            삭제
          </Button>
        </div>
      )}
      <Link href={`/${props.el.type}/${props.el._id}`}>
        <div className="bottomContents">
          <p>{index}</p>
          {el.imageUrls?.[0] !== undefined ? (
            <Image src={el.imageUrls?.[0] ?? ""} alt={el.address ?? DEFAULT_STRING_VALUE} width={200} height={120} />
          ) : (
            <BasicUnImage width="200px" height="120px" fontSize="28px" />
          )}
          <S.BuildingInfo>
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
          </S.BuildingInfo>
          <S.BuildingAd>
            <h3>광고 정보</h3>
            {props.isDeleted && (
              <p className="adEnd">
                <span>광고 종료: </span>
                {formatDate(el.deletedAt?.seconds ?? DEFAULT_NUMBER_VALUE)}
              </p>
            )}
            <p>
              <span>광고 기한: </span>
              {formatDate((el.createdAt?.seconds ?? DEFAULT_NUMBER_VALUE) + DAY_LIMIT)}
            </p>
            <p>
              <span>광고 시작: </span>
              {formatDate(el.createdAt?.seconds ?? DEFAULT_NUMBER_VALUE)}
            </p>
          </S.BuildingAd>
        </div>
      </Link>
    </S.ListItem>
  );
}
