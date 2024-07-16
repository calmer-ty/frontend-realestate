import { useState } from "react";
import { mapStyle } from "./styles";
import { useNaverMap } from "@/src/hooks/useNaverMap";
import type { INaverMapProps, IMarkerData } from "@/src/types";

export default function NaverMap({ geocodeResults, ncpClientId }: INaverMapProps): JSX.Element {
  const [markerDatas, setMarkerDatas] = useState<IMarkerData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IMarkerData | null>(null);

  const isBillion = (amount: number): number => {
    return Math.floor(amount / 10000);
  };
  const isTenMillion = (amount: number): number => {
    return amount % 10000;
  };

  useNaverMap({ ncpClientId, geocodeResults, setMarkerDatas, setSelectedMarkerData });
  return (
    <>
      <div id="map" style={mapStyle.container}>
        <p style={mapStyle.message.loading}>{geocodeResults.length === 0 ? "지도 정보를 불러오는 중입니다." : ""}</p>
        {/* 사용자가 선택한 아파트 정보 */}
        <div style={mapStyle.info}>
          {/* <S.InfoContainer> */}
          {selectedMarkerData !== null ? (
            <article style={mapStyle.info.selector.wrap}>
              <section style={mapStyle.info.selector.container}>
                <h3 style={mapStyle.info.selector.apartmentName}>{selectedMarkerData.apartmentName}</h3>
                <h4 style={mapStyle.info.selector.recentDeal.title}>최근 실거래가</h4>
                <div style={mapStyle.info.selector.recentDeal.content}>
                  <p>
                    <strong>
                      매매 {isBillion(selectedMarkerData.amount) !== 0 ? `${isBillion(selectedMarkerData.amount)}억` : ""} {isTenMillion(selectedMarkerData.amount) !== 0 ? `${isTenMillion(selectedMarkerData.amount)}만` : ""} 원
                    </strong>
                    <br />
                    {selectedMarkerData.dealYear}.{selectedMarkerData.dealMonth}.{selectedMarkerData.dealDay}・{selectedMarkerData.floor}층・{selectedMarkerData.area}m²
                  </p>
                </div>
              </section>
              <section>
                <div>매물이 없습니다</div>
              </section>
            </article>
          ) : (
            // {/* 사용자가 보이는 지도 범위의 아파트 리스트 */}
            <ul>
              {markerDatas.map((el, index) => (
                <li key={`${el.address}_${index}`} style={mapStyle.info.list.item.container}>
                  <h3 style={mapStyle.info.list.item.amount}>
                    매매 {isBillion(el.amount) !== 0 ? `${isBillion(el.amount)}억` : ""} {isTenMillion(el.amount) !== 0 ? `${isTenMillion(el.amount)}만` : ""} 원
                  </h3>
                  <p>
                    아파트・{el.apartmentName}
                    <br />
                    {el.area}m² {el.floor}층
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
