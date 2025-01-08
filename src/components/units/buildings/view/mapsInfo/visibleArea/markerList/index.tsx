import { getReduceCityName } from "@/src/commons/libraries/utils/convertCityName";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";

import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import type { IMarkerListProps } from "./types";
import type { IGeocodeData } from "@/src/commons/types";
import * as S from "./styles";
// import { Pagination } from "@mui/material";
// import { useEffect, useState } from "react";

export default function MarkerList(props: IMarkerListProps): JSX.Element {
  const { visibleMarkerData, firestoreData, setSelectedData } = props;
  const onClickInfo = (el: IGeocodeData): void => {
    setSelectedData(el); // 선택된 el을 상태에 저장
  };

  // const [displayedMarkers, setDisplayedMarkers] = useState<IGeocodeData[]>([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const pageSize = 10; // 한 페이지에 보여줄 데이터 개수
  // console.log("displayedMarkers: ",displayedMarkers)
  // console.log("currentPage: ",currentPage)
  // console.log("visibleMarkerData: ",visibleMarkerData)

  // // 페이지 변경 시 호출되는 함수
  // const handlePageChange = (event: React.ChangeEvent<unknown>, value: number): void => {
  //   setCurrentPage(value); // 선택된 페이지로 상태 업데이트
  // };

  // // 페이지가 변경될 때마다 데이터를 갱신하는 useEffect
  // useEffect(() => {
  //   const start = (currentPage - 1) * pageSize; // 페이지 시작 인덱스
  //   const end = currentPage * pageSize; // 페이지 끝 인덱스
  //   setDisplayedMarkers(visibleMarkerData.slice(start, end)); // 해당 페이지의 데이터만 보여주기
  // }, [currentPage, visibleMarkerData]);
  return (
    <>
      <S.List>
        {visibleMarkerData.map((el, index) => {
          const matchingFirestoreData = firestoreData.some((firestoreData) => getReduceCityName(el.geocode?.jibunAddress ?? DEFAULT_STRING_VALUE) === firestoreData.address);

          return (
            <li
              key={`${el.data?.aptNm}_${index}`}
              onClick={() => {
                onClickInfo(el);
              }}
            >
              <h2>
                매매 {isBillion(el.data?.dealAmount?.replace(/,/g, "") ?? DEFAULT_STRING_VALUE)}&nbsp;
                {isTenMillion(el.data?.dealAmount?.replace(/,/g, "") ?? DEFAULT_STRING_VALUE)}원
              </h2>
              <p>
                아파트・{el.data?.aptNm}
                <br />
                {el.data?.excluUseAr}m² {el.data?.floor}층
              </p>
              <div>{matchingFirestoreData && <>매물있음</>}</div>
            </li>
          );
        })}
      </S.List>
      {/* <Pagination count={10} onChange={handlePageChange} /> */}
    </>
  );
}
