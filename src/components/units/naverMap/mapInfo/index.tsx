import { isBillion, isTenMillion } from "@/src/commons/libraries/utils";
import type { IMapInfoProps } from "./types";
import { infoStyle } from "./styles";

export default function MapInfo(props: IMapInfoProps): JSX.Element {
  // console.log("props.markerDatas", props.markerDatas);
  // console.log("props.firebaseDatas", props.firebaseDatas);
  // console.log("props.firebaseDatas", props.firebaseDatas);

  // const matchedFirebaseData = props.firebaseDatas.find((fbData) => {
  //   // markerDatas 배열을 순회하면서 주소를 짧게 변환한 새로운 배열을 생성
  //   const markerAddresses = props.visibleMarkerDatas.map((el) => shortenCityName(el.address));
  //   // fbData의 주소가 markerAddresses 배열에 포함되어 있는지 확인
  //   return markerAddresses.includes(fbData.address);
  // });
  // console.log("matchedFirebaseData", matchedFirebaseData);
  return (
    <div style={infoStyle.container}>
      {props.selectedMarkerData !== null ? (
        <article style={infoStyle.selector.wrap}>
          {/* 지도 범위에 보여지는 영역 리스트 */}
          <section style={infoStyle.selector.container}>
            <h2 style={infoStyle.selector.apartmentName}>{props.selectedMarkerData.apartmentName}</h2>
            <h3 style={infoStyle.selector.recentDeal.title}>최근 실거래가</h3>
            <div style={infoStyle.selector.recentDeal.content}>
              <p>
                <strong>
                  매매 {isBillion(props.selectedMarkerData.amount) !== 0 ? `${isBillion(props.selectedMarkerData.amount)}억` : ""} {isTenMillion(props.selectedMarkerData.amount) !== 0 ? `${isTenMillion(props.selectedMarkerData.amount)}만` : ""} 원
                </strong>
                <br />
                {props.selectedMarkerData.dealYear}.{props.selectedMarkerData.dealMonth}.{props.selectedMarkerData.dealDay}・{props.selectedMarkerData.floor}층・{props.selectedMarkerData.area}m²
                <br />
                {props.selectedMarkerData.address}
              </p>
            </div>
          </section>
          {/* 클릭시 건물 상세 정보 */}
          <section>
            {props.firebaseDatas.map((el, index) => {
              return <div key={index}>{el.address}</div>;
            })}
            {/* {matchedFirebaseData !== undefined ? (
              <>
                <div>{matchedFirebaseData?.address}</div>
                <div>{matchedFirebaseData?.addressDetail}</div>
              </>
            ) : (
              <div>
                조건에 맞는 방이 없습니다.
                <br />
                위치 및 필터를 조정해보세요.
              </div>
            )} */}
          </section>
        </article>
      ) : (
        <>
          <ul>
            {props.visibleMarkerDatas.map((el, index) => (
              <li key={`${el.address}_${index}`} style={infoStyle.list.item.container}>
                <h2 style={infoStyle.list.item.amount}>
                  매매 {isBillion(el.amount) !== 0 ? `${isBillion(el.amount)}억` : ""} {isTenMillion(el.amount) !== 0 ? `${isTenMillion(el.amount)}만` : ""} 원
                </h2>
                <p>
                  아파트・{el.apartmentName}
                  <br />
                  {el.area}m² {el.floor}층
                </p>
                {/* <div>{matchedFirebaseData !== undefined ? "매물 있음" : " 매물 없음"}</div> */}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
