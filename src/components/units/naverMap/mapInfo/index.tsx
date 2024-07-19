import { isBillion, isTenMillion, shortenCityName } from "@/src/commons/libraries/utils";
import type { IMapInfoProps } from "./types";
// import { infoStyle } from "./styles";
import * as S from "./styles";

export default function MapInfo(props: IMapInfoProps): JSX.Element {
  const matchedFirebaseData = props.firebaseDatas.filter((el) => shortenCityName(props.selectedMarkerData?.address ?? "") === el.address || shortenCityName(props.selectedMarkerData?.address_street ?? "") === el.address);
  console.log("props:::", props);
  return (
    <S.Container>
      {/* 클릭시 건물 상세 정보 */}
      {props.selectedMarkerData !== null ? (
        <S.SelectedArea>
          <S.SelectedInfo>
            <S.InfoWrap>
              <S.SelectedBuildingName>{props.selectedMarkerData.apartmentName}</S.SelectedBuildingName>
              연식: {props.selectedMarkerData.constructionYear}
              <br />
              지번: {props.selectedMarkerData.address}
              <br />
              도로명: {props.selectedMarkerData.address_street}
            </S.InfoWrap>

            <S.InfoWrap>
              <S.SelectedTitle>최근 실거래가</S.SelectedTitle>
              <S.SelectedContent>
                <p>
                  <strong>
                    매매 {isBillion(props.selectedMarkerData.amount) !== 0 ? `${isBillion(props.selectedMarkerData.amount)}억` : ""} {isTenMillion(props.selectedMarkerData.amount) !== 0 ? `${isTenMillion(props.selectedMarkerData.amount)}만` : ""} 원
                  </strong>
                  <br />
                  {props.selectedMarkerData.dealYear}.{props.selectedMarkerData.dealMonth}.{props.selectedMarkerData.dealDay}・{props.selectedMarkerData.floor}층・{props.selectedMarkerData.area}m²
                </p>
              </S.SelectedContent>
            </S.InfoWrap>
          </S.SelectedInfo>

          <S.RegisteredInfo>
            {matchedFirebaseData.length > 0 ? (
              <ul>
                {matchedFirebaseData.map((el, index) => (
                  <li key={`${el.address}_${index}`}>
                    {el.address} {el.addressDetail}
                  </li>
                ))}
              </ul>
            ) : (
              <div>매물 없음</div>
            )}
          </S.RegisteredInfo>
        </S.SelectedArea>
      ) : (
        <>
          {/* 보여지는 지도 범위의 건물 리스트 */}
          <S.VisibleArea>
            <ul>
              {props.visibleMarkerDatas.map((el, index) => {
                const matchingFirebaseData = props.firebaseDatas.some((firebaseData) => shortenCityName(el.address) === firebaseData.address);

                return (
                  <S.VisibleList key={`${el.address}_${index}`}>
                    <S.VisibleTitle>
                      매매 {isBillion(el.amount) !== 0 ? `${isBillion(el.amount)}억` : ""} {isTenMillion(el.amount) !== 0 ? `${isTenMillion(el.amount)}만` : ""} 원
                    </S.VisibleTitle>
                    <p>
                      아파트・{el.apartmentName}
                      <br />
                      {el.area}m² {el.floor}층
                    </p>
                    <div>{matchingFirebaseData && <>매물있음</>}</div>
                  </S.VisibleList>
                );
              })}
            </ul>
          </S.VisibleArea>
        </>
      )}
    </S.Container>
  );
}
