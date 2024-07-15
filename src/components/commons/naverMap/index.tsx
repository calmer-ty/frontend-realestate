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
          {selectedMarkerData !== null ? (
            <div style={mapStyle.info.selector.container}>
              <p style={mapStyle.info.selector.apartmentName}>
                <strong>{selectedMarkerData.apartmentName}</strong>
              </p>
              <div style={mapStyle.info.selector.recentDeal.container}>
                <span style={mapStyle.info.selector.recentDeal.title}>최근 실거래가</span>
                <div style={mapStyle.info.selector.recentDeal.content}>
                  <p>
                    <strong>
                      매매 {isBillion(selectedMarkerData.amount) !== 0 ? `${isBillion(selectedMarkerData.amount)}억` : ""} {isTenMillion(selectedMarkerData.amount) !== 0 ? `${isTenMillion(selectedMarkerData.amount)}만` : ""} 원
                    </strong>
                  </p>
                  <p>
                    {selectedMarkerData.dealYear}.{selectedMarkerData.dealMonth}.{selectedMarkerData.dealDay}・{selectedMarkerData.floor}층・{selectedMarkerData.area}m²
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {/* 사용자가 보이는 지도 범위의 아파트 리스트 */}
          <ul>
            {markerDatas.map((el, index) => (
              <li key={`${el.address}_${index}`} style={mapStyle.info.list.item.container}>
                <p style={mapStyle.info.list.item.amount}>
                  <strong>
                    매매 {isBillion(el.amount) !== 0 ? `${isBillion(el.amount)}억` : ""} {isTenMillion(el.amount) !== 0 ? `${isTenMillion(el.amount)}만` : ""} 원
                  </strong>
                </p>
                <p>아파트・{el.apartmentName}</p>
                <p>
                  {el.area}m² {el.floor}층
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
