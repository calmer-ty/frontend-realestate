import { formatPrice, getTransactionText } from "@/src/commons/libraries/utils/priceFormatter";
import { korToEng } from "@/src/commons/libraries/utils/convertCollection";

import Image from "next/image";
import Link from "next/link";
import BasicUnImage from "@/src/components/commons/unImage/basic";

import * as S from "./styles";

import type { IFirestore } from "@/src/commons/types";
import NoDataMessage from "@/src/components/commons/noDataMessage";
interface IMatchedListProps {
  matchedDatas: IFirestore[];
  alignment: string | null;
}

export default function MatchedList({ matchedDatas, alignment }: IMatchedListProps): JSX.Element {
  // alignment 값이 있을 경우 transactionType이 alignment와 일치하는 항목만 필터링
  const filteredDatas = alignment !== null ? matchedDatas.filter((el) => el.transactionType === alignment) : matchedDatas;

  return (
    <S.Container>
      {filteredDatas.length !== 0 ? (
        <ul>
          {filteredDatas.map((el, index) => (
            <li key={`${el.buildingType}_${el.address}_${index}`}>
              <Link href={`/${korToEng(el.buildingType)}/${el._id}`}>
                {el.imageUrls?.[0] !== undefined ? <Image src={el.imageUrls?.[0]} width={80} height={80} alt={el._id} unoptimized /> : <BasicUnImage width="80px" height="80px" fontSize="24px" />}
                <p>
                  <strong>{getTransactionText(el.transactionType, el.price, el.rent)}</strong>
                  <span>
                    {el.buildingType}・{el.addressDetail}
                  </span>
                  <span>
                    {el.floor}층, {el.area}m², 관리비 {formatPrice(el.manageCost)}
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <NoDataMessage text="거래 가능한 매물이 없습니다. 조건을 다시 설정해주세요." />
      )}
    </S.Container>
  );
}
