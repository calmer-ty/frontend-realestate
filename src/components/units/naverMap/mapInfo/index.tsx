import { isBillion, isTenMillion } from "@/src/commons/libraries/utils";
import type { IMapInfoProps } from "./types";
import { infoStyle } from "./styles";

export default function MapInfo(props: IMapInfoProps): JSX.Element {
  return (
    <div style={infoStyle.container}>
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
                {props.selectedMarkerData.location} {props.selectedMarkerData.address}
              </p>
            </div>
          </section>
          <section>
            <div>매물이 없습니다</div>
          </section>
        </article>
      ) : (
        <>
          <ul>
            {props.markerDatas.map((el, index) => (
              <li key={`${el.address}_${index}`} style={infoStyle.list.item.container}>
                <h2 style={infoStyle.list.item.amount}>
                  매매 {isBillion(el.amount) !== 0 ? `${isBillion(el.amount)}억` : ""} {isTenMillion(el.amount) !== 0 ? `${isTenMillion(el.amount)}만` : ""} 원
                </h2>
                <p>
                  아파트・{el.apartmentName}
                  <br />
                  {el.area}m² {el.floor}층
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
