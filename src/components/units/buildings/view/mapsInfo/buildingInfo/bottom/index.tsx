import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";
import { DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE } from "@/src/commons/constants";

import Image from "next/image";
import Link from "next/link";
import BasicUnImage from "@/src/components/commons/unImages/basic";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import type { IBuildingInfoBottomProps } from "./types";
import * as S from "./styles";

export default function BuildingInfoBottom(props: IBuildingInfoBottomProps): JSX.Element {
  const jibunAddress = props.selectedData.geocode?.jibunAddress;
  const roadAddress = props.selectedData.geocode?.roadAddress;

  const matchedData = props.firestoreData.filter((el) => jibunAddress === el.address || roadAddress === el.address);
  return (
    <S.Container>
      {matchedData.length > 0 ? (
        <S.Registered>
          <h3>
            총 <strong>{matchedData.length}</strong>개의 매물이 있습니다
          </h3>
          <ul className="buildingList">
            {matchedData.map((el, index) => (
              <li key={`${el.type}_${el.address}_${index}`}>
                <Link href={`/${props.buildingType}/${el._id}`}>
                  {el.imageUrls?.[0] !== undefined ? (
                    <Image src={el.imageUrls?.[0] ?? DEFAULT_STRING_VALUE} width={80} height={80} alt={el._id ?? DEFAULT_STRING_VALUE} unoptimized />
                  ) : (
                    <BasicUnImage width="80px" height="80px" fontSize="24px" />
                  )}
                  <p>
                    <strong>
                      매매 {isBillion(el.price ?? DEFAULT_NUMBER_VALUE)}
                      {isTenMillion(el.price ?? DEFAULT_NUMBER_VALUE)}원
                    </strong>
                    <br />
                    {el.type}・{el.addressDetail}
                    <br />
                    {el.floor}층, {el.area}m², 관리비 {el.manageCost}만원
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </S.Registered>
      ) : (
        <S.UnRegistered>
          <ErrorOutlineIcon fontSize="large" />
          <p>
            거래 가능한 매물이 없습니다.
            <br />
            다른 건물을 선택해 주세요.
          </p>
        </S.UnRegistered>
      )}
    </S.Container>
  );
}
