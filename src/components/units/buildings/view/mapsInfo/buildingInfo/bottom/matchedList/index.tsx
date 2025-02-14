import { formatPrice, getTransactionText } from "@/src/commons/libraries/utils/priceFormatter";
import { korToEng } from "@/src/commons/libraries/utils/convertCollection";

import Image from "next/image";
import Link from "next/link";
import BasicUnImage from "@/src/components/commons/unImage/basic";
import NoDataMessage from "@/src/components/commons/noDataMessage";

import * as S from "./styles";

import type { IFirestore } from "@/src/commons/types";
interface IMatchedListProps {
  matchedDatas: IFirestore[];
  alignment: string | null;
}

export default function MatchedList({ matchedDatas, alignment }: IMatchedListProps): JSX.Element {
  // alignment 값이 있을 경우 transactionType이 alignment와 일치하는 항목만 필터링
  const filteredDatas = alignment !== null ? matchedDatas.filter((el) => el.transactionType === alignment) : matchedDatas;

  return (
    <>
      {filteredDatas.length !== 0 ? (
        <S.List>
          {filteredDatas.map((el, index) => (
            <li key={`${el.buildingType}_${el.address}_${index}`}>
              <Link href={`/${korToEng(el.buildingType)}/${el._id}`}>
                <figure>
                  {el.imageUrls?.[0] !== undefined ? (
                    <Image src={el.imageUrls?.[0]} alt={el._id} fill sizes="100%" style={{ objectFit: "cover" }} unoptimized />
                  ) : (
                    <BasicUnImage width="100%" height="100%" fontSize="2rem" />
                  )}
                </figure>
                <div className="buildingInfo">
                  <strong>{getTransactionText(el.transactionType, el.price, el.rent)}</strong>
                  <span>
                    {el.buildingType}・{el.addressDetail}
                  </span>
                  <span>
                    {el.floor}층, {el.area}m², 관리비 {formatPrice(el.manageCost)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </S.List>
      ) : (
        <NoDataMessage text="거래 가능한 매물이 없습니다. 조건을 다시 설정해주세요." />
      )}
    </>
  );
}
