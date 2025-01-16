import { convertTimestamp } from "@/src/commons/libraries/utils/convertTimestamp";

import { DEFAULT_NUMBER_VALUE } from "@/src/commons/constants";
import * as S from "./styles";

import type { IFirestore } from "@/src/commons/types";
interface IItemAdProps {
  el: IFirestore;
  isDeleted: boolean;
}

// 날짜 포맷팅 함수 분리
const formatDate = (timestamp: number): string => {
  const { year, month, day, hours, minutes, seconds } = convertTimestamp(timestamp);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default function ItemAd(props: IItemAdProps): JSX.Element {
  const { el, isDeleted } = props;
  return (
    <S.Container>
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
    </S.Container>
  );
}
