import { isBillion, isTenMillion, shortenCityName } from "@/src/commons/libraries/utils";
import type { IMapInfoProps } from "./types";
import { infoStyle } from "./styles";

export default function MapInfo(props: IMapInfoProps): JSX.Element {
  const matchedFirebaseData = props.firebaseDatas.filter((el) => shortenCityName(props.selectedMarkerData?.address ?? "") === el.address);
  console.log(matchedFirebaseData);
  return (
    <div style={infoStyle.container}>
      {/* 클릭시 건물 상세 정보 */}
      {props.selectedMarkerData !== null ? (
        <article style={infoStyle.selector.wrap}>
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

          <section>
            {matchedFirebaseData.length > 0 ? (
              matchedFirebaseData.map((el, index) => (
                <div key={`${el.address}_${index}`}>
                  {el.address} {el.addressDetail}
                </div>
              ))
            ) : (
              <div>매물 없음</div>
            )}
          </section>
        </article>
      ) : (
        <>
          {/* 보여지는 지도 범위의 건물 리스트 */}
          <ul>
            {props.visibleMarkerDatas.map((el, index) => {
              const matchingFirebaseData = props.firebaseDatas.some((firebaseData) => shortenCityName(el.address) === firebaseData.address);

              return (
                <li key={`${el.address}_${index}`} style={infoStyle.list.item.container}>
                  <h2 style={infoStyle.list.item.amount}>
                    매매 {isBillion(el.amount) !== 0 ? `${isBillion(el.amount)}억` : ""} {isTenMillion(el.amount) !== 0 ? `${isTenMillion(el.amount)}만` : ""} 원
                  </h2>
                  <p>
                    아파트・{el.apartmentName}
                    <br />
                    {el.area}m² {el.floor}층
                  </p>
                  <div>{matchingFirebaseData && <>매물있음</>}</div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
