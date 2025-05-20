import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import NoDataMessage from "@/src/components/commons/noDataMessage";
import BasicUnImage from "@/src/components/commons/unImage/basic";
import BasicToggleButton from "@/src/components/commons/button/toggle/basic";

import { formatPrice, getTransactionText } from "@/src/commons/libraries/utils/priceFormatter";
import { korToEng } from "@/src/commons/libraries/utils/convertCollection";

import * as S from "./styles";

import { BUILDING_TYPE } from "@/src/commons/constants";
import type { IFirestore, IGeocodeData } from "@/src/commons/types";
interface IListingProps {
  selectedData: IGeocodeData;
  matchingData: IFirestore[];
}
interface IMatchedListProps {
  matchingData: IFirestore[];
  alignment: string | null;
}

export default function Listing({ selectedData, matchingData }: IListingProps): JSX.Element {
  // 토글 로직 빼옴
  const [alignment, setAlignment] = useState<string | null>("월세");
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null): void => {
    setAlignment(newAlignment);
  };

  // 매칭된 데이터와 파이어베이스에서 값을 대조하여 해당 조건에 맞는 것만 필터링합니다.
  const filteredMatchingData = matchingData.filter((matchingData) => selectedData.geocode?.jibunAddress === matchingData.address || selectedData.geocode?.roadAddress === matchingData.address);

  return (
    <S.Listing>
      <div className="topMenu">
        <h3>
          총 <strong>{filteredMatchingData.length}</strong>개의 매물이 있습니다
        </h3>
        <BasicToggleButton options={BUILDING_TYPE} value={alignment} onChange={handleAlignment} />
      </div>
      <div className="bottomContents">
        {filteredMatchingData.length !== 0 ? (
          <MatchedList matchingData={filteredMatchingData} alignment={alignment} />
        ) : (
          <NoDataMessage>
            <p>거래 가능한 매물이 없습니다.</p>
            <p>다른 건물을 선택해 주세요.</p>
          </NoDataMessage>
        )}
      </div>
    </S.Listing>
  );
}

function MatchedList({ matchingData, alignment }: IMatchedListProps): JSX.Element {
  // alignment 값이 있을 경우 transactionType이 alignment와 일치하는 항목만 필터링
  const filteredMatchingData = alignment !== null ? matchingData.filter((el) => el.transactionType === alignment) : matchingData;

  return (
    <>
      {filteredMatchingData.length !== 0 ? (
        <S.MatchedList>
          {filteredMatchingData.map((el, index) => (
            <li key={`${el.buildingType}_${el.address}_${index}`}>
              <Link href={`/${korToEng(el.buildingType)}/${el._id}`}>
                <figure>
                  {el.imageUrls?.[0] !== undefined ? (
                    <Image src={el.imageUrls?.[0]} alt={el._id} fill sizes="100%" style={{ objectFit: "cover" }} unoptimized />
                  ) : (
                    <BasicUnImage className="w-full h-full text-[2rem]" />
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
        </S.MatchedList>
      ) : (
        <NoDataMessage>
          <p>거래 가능한 매물이 없습니다.</p>
          <p>조건을 다시 설정해주세요.</p>
        </NoDataMessage>
      )}
    </>
  );
}
