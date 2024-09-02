import { useEffect, useState } from "react";
import { isBillion, isTenMillion, shortenCityName } from "@/src/commons/libraries/utils/regex";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import type { IFirebaseData, IMarkerData } from "@/src/commons/types";
import type { IVisibleAreaProps } from "./types";
import * as S from "./styles";

import ChipSmall from "@/src/components/commons/dataDisplays/chip/small";
import Link from "next/link";
import Image from "next/image";
import UnImageBasic from "@/src/components/commons/unImages/basic";

export default function VisibleArea(props: IVisibleAreaProps): JSX.Element {
  const { buildingType, firebaseDatas } = props;
  const [select, setSelect] = useState(false);
  const [selectedEl, setSelectedEl] = useState<IMarkerData | null>(null);

  const matchedFirebaseData: IFirebaseData[] = firebaseDatas.filter(
    (el) => shortenCityName(selectedEl?.address ?? "") === el.address || shortenCityName(selectedEl?.address_road ?? "") === el.address
  );

  const onClickInfo = (el: IMarkerData): void => {
    console.log(el);
    setSelect((prev) => !prev);
    setSelectedEl(el); // 선택된 el을 상태에 저장
  };

  useEffect(() => {
    setSelect(false);
  }, [props.visibleMarkerDatas]);

  return (
    <S.Container>
      {props.visibleMarkerDatas.length !== 0 ? (
        <S.Visible>
          {!select && (
            <ul>
              {props.visibleMarkerDatas.map((el, index) => {
                const matchingFirebaseData = props.firebaseDatas.some((firebaseData) => shortenCityName(el.address) === firebaseData.address);

                return (
                  <li
                    key={`${el.address}_${index}`}
                    onClick={() => {
                      onClickInfo(el);
                    }}
                  >
                    <h2>
                      매매 {isBillion(el.price)}&nbsp;
                      {isTenMillion(el.price)}원
                    </h2>
                    <p>
                      아파트・{el.buildingName}
                      <br />
                      {el.area}m² {el.floor}층
                    </p>
                    <div>{matchingFirebaseData && <>매물있음</>}</div>
                  </li>
                );
              })}
            </ul>
          )}
          {select && selectedEl !== null && (
            <>
              <S.BuildingInfo>
                <S.InfoWrap>
                  <h2>{selectedEl.buildingName}</h2>
                  <S.TextWrap>
                    <ChipSmall label="연식" /> {selectedEl.constructionYear}
                  </S.TextWrap>
                  <S.TextWrap>
                    <ChipSmall label="지번" /> {selectedEl.address}
                  </S.TextWrap>
                  <S.TextWrap>
                    <ChipSmall label="도로명" />
                    {selectedEl.address_road}
                  </S.TextWrap>
                </S.InfoWrap>

                <S.InfoWrap>
                  <h3>최근 실거래가</h3>
                  <S.SelectedContent>
                    <strong>
                      매매 {isBillion(selectedEl.price)}&nbsp;
                      {isTenMillion(selectedEl.price)}원
                    </strong>
                    <p>
                      {selectedEl.dealYear}.{selectedEl.dealMonth}.{selectedEl.dealDay}・{selectedEl.floor}층・{selectedEl.area}m²
                    </p>
                  </S.SelectedContent>
                </S.InfoWrap>
              </S.BuildingInfo>

              {/* 등록된 건물 정보 */}
              <S.RegisteredInfo>
                {matchedFirebaseData.length > 0 ? (
                  <S.Registered>
                    <h3>
                      총 <strong>{matchedFirebaseData.length}</strong>개의 매물이 있습니다
                    </h3>
                    <ul className="buildingList">
                      {matchedFirebaseData.map((el, index) => (
                        <li key={`${el.type}_${el.address}_${index}`}>
                          <Link href={`/${buildingType}/${el._id}`}>
                            {el.imageUrls?.[0] !== undefined ? (
                              <Image src={el.imageUrls?.[0] ?? ""} width={80} height={80} alt={el._id} />
                            ) : (
                              <UnImageBasic width="80px" height="80px" fontSize="24px" />
                            )}
                            <p>
                              <strong>
                                매매 {isBillion(el.price)}
                                {isTenMillion(el.price)}원
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
              </S.RegisteredInfo>
            </>
          )}
        </S.Visible>
      ) : (
        <S.UnVisible>
          <ErrorOutlineIcon fontSize="large" />
          <p>
            조건에 맞는 방이 없습니다.
            <br /> 위치를 조정해보세요.
          </p>
        </S.UnVisible>
      )}
    </S.Container>
  );
}
