import { useEffect, useState } from "react";
import { isBillion, isTenMillion, shortenCityName } from "@/src/commons/libraries/utils/regex";
import BuildingInfo from "../buildingInfo";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import type { IMarkerData } from "@/src/commons/types";
import type { IVisibleAreaProps } from "./types";
import * as S from "./styles";

export default function VisibleArea(props: IVisibleAreaProps): JSX.Element {
  const { buildingType, firebaseDatas } = props;
  const [select, setSelect] = useState(false);
  const [selectedEl, setSelectedEl] = useState<IMarkerData | null>(null);

  useEffect(() => {
    setSelect(false);
    setSelectedEl(null);
  }, [props.visibleMarkerDatas]);

  const onClickInfo = (el: IMarkerData): void => {
    console.log(el);
    setSelect((prev) => !prev);
    setSelectedEl(el); // 선택된 el을 상태에 저장
  };

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
          {selectedEl !== null && <BuildingInfo selectedData={selectedEl} firebaseDatas={firebaseDatas} buildingType={buildingType} isSelected={select} />}
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
