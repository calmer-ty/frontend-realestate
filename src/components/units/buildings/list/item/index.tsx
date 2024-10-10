import Link from "next/link";
import Image from "next/image";
import BasicUnImage from "@/src/components/commons/unImages/basic";
import { Button } from "@mui/material";

import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/regex";
import { convertTimestamp } from "@/src/commons/libraries/utils/convertTimestamp";
import type { IListItem } from "./types";
import * as S from "./styles";
import { engToKor } from "@/src/commons/libraries/utils/convertCollection";

export default function ListItem(props: IListItem): JSX.Element {
  return (
    <S.ListItem>
      {props.data.map((el, index) => (
        <li key={`${el._id}_${index}`}>
          {!props.isDeleted && (
            <div className="topContents">
              <Link href={`/${el.type}/${el._id}/edit/`}>
                <Button variant="outlined">수정</Button>
              </Link>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  props.onDeleteModalOpen?.(el);
                }}
              >
                삭제
              </Button>
            </div>
          )}

          <div className="bottomContents">
            <p>{index}</p>
            {el.imageUrls?.[0] !== undefined ? (
              <Image src={el.imageUrls?.[0] ?? ""} alt={el.address ?? "값 없음"} width={200} height={120} />
            ) : (
              <BasicUnImage width="200px" height="120px" fontSize="28px" />
            )}
            <S.BuildingInfo>
              <h3>
                <p>
                  {engToKor(el.type ?? "값 없음")} - <i></i>방 {el.roomCount}개, 욕실 {el.bathroomCount}개
                </p>
                <p className="price">
                  매매 {el.price === 0 ? `${isBillion(el.price)}억` : ""} {isTenMillion(el.price ?? NaN)}원
                </p>
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
                  {(() => {
                    const deletedAtSeconds = el.deletedAt?.seconds ?? 0;
                    const { year, month, day, hours, minutes, seconds } = convertTimestamp(deletedAtSeconds);
                    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                  })()}
                </p>
              )}
              <p>
                <span>광고 기한 </span>
                {(() => {
                  const createdAtSeconds = el.createdAt?.seconds ?? 0;
                  const { year, month, day } = convertTimestamp(createdAtSeconds + 2592000);
                  return `${year}-${month}-${day}`;
                })()}
              </p>
              <p>
                <span>광고 시작 </span>
                {(() => {
                  const { year, month, day, hours, minutes, seconds } = convertTimestamp(el.createdAt?.seconds ?? 0);
                  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                })()}
              </p>
            </S.BuildingAd>
          </div>
        </li>
      ))}
    </S.ListItem>
  );
}
