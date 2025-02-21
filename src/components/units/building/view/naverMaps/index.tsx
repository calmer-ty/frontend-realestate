import { useCallback, useRef, useState } from "react";
import { useMapsLoader } from "@/src/hooks/maps/useMapsLoader";
import { loadScript } from "@/src/commons/libraries/utils/maps/init";

import RegionSelect from "../ui/regionSelect";
import MapMode from "../ui/mapMode";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import * as S from "./styles";
import "./marker.css";
import type { Dispatch, SetStateAction } from "react";
import type { IAssetForm, IFirestore, IGeocode, IGeocodeData } from "@/src/commons/types";
interface INaverMapsProps {
  geocode: IGeocode | undefined;
  allGeocodeData: IGeocodeData[];
  allGeocodeDataLoading: boolean;
  matchingData: IFirestore[];
  setSelectedMarkerData: Dispatch<SetStateAction<IGeocodeData | undefined>>;
  setVisibleMarkerData: Dispatch<SetStateAction<IGeocodeData[]>>;
  setRegionName: Dispatch<SetStateAction<string | undefined>>;
  setRegionCode: Dispatch<SetStateAction<string | undefined>>;
}

interface IMarkerIconContentParams {
  geocodeData: IGeocodeData;
  matchingData: IFirestore[];
  mapMode: boolean;
  totalAsset: number;
}

interface ICreateMarkerParams {
  geocodeData: IGeocodeData;
  matchingData: IFirestore[];
  setSelectedMarkerData: (data: IGeocodeData) => void;
  mapMode: boolean;
  totalAsset: number;
}
interface IClusterIcon {
  content: string;
  size: any;
  anchor: any;
}

const markerIconContent = ({ geocodeData, matchingData, mapMode, totalAsset }: IMarkerIconContentParams): string => {
  const isMatched = matchingData.some((matchingData) => matchingData.address === geocodeData.geocode.jibunAddress || matchingData.address === geocodeData.geocode.roadAddress);

  const amount = Number(geocodeData.data?.dealAmount);
  const peng = Math.round(geocodeData.data?.excluUseAr * 0.3025);
  const affordRate = Math.min(100, Math.round((totalAsset / amount) * 100));

  return `
    <div class="markerBox ${mapMode ? "asset" : ""} ${isMatched ? "hasData" : ""}">
      <div class="top">${peng}평</div>
      <div class="bottom"> 
      <span>매</span> <strong>${amount / 10000}억</strong></div>
      <div class="progress" style="width: ${mapMode ? affordRate : "0"}%; background-color: ${affordRate < 30 ? "red" : affordRate < 70 ? "orange" : "green"};"></div>
    </div>`;
};
const createMarker = ({ geocodeData, setSelectedMarkerData, ...restParams }: ICreateMarkerParams): any => {
  if (geocodeData === null) return;
  const markerOptions = {
    position: new window.naver.maps.LatLng(geocodeData.geocode?.latitude, geocodeData.geocode?.longitude),
    map: null, // Set map to null initially
    icon: {
      content: markerIconContent({ geocodeData, ...restParams }),
    },
  };

  const marker = new window.naver.maps.Marker(markerOptions);
  marker.set("data", geocodeData);

  window.naver.maps.Event.addListener(marker, "click", () => {
    if (geocodeData.data !== undefined) {
      setSelectedMarkerData(geocodeData);
    }
  });

  return marker;
};

const createClusterIcons = (): IClusterIcon[] => {
  const icons = [];
  for (let i = 1; i <= 5; i++) {
    icons.push({
      content: `<div class="cluster" style="background-image: url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-${i}.png);"></div>`,
      size: new window.naver.maps.Size(40, 40),
      anchor: new window.naver.maps.Point(20, 20),
    });
  }
  return icons;
};
const clusteringOptions = (map: any, markers: any[]): any => {
  return new window.MarkerClustering({
    minClusterSize: 5, // 클러스터 최소 마커 개수 증가
    maxZoom: 16, // 최대 줌 레벨 최적화
    map,
    markers,
    disableClickZoom: false,
    gridSize: 300, // 그리드 크기 최적화
    icons: createClusterIcons(),
    indexGenerator: [10, 20, 50, 100, 200],
    stylingFunction: (clusterMarker: any, count: any) => {
      clusterMarker.getElement().querySelector("div:first-child").innerText = count;
    },
  });
};

export default function NaverMaps({
  geocode,
  allGeocodeData,
  matchingData,
  setSelectedMarkerData,
  setVisibleMarkerData,
  setRegionCode,
  setRegionName,
  allGeocodeDataLoading,
}: INaverMapsProps): JSX.Element {
  // 맵 모드
  const [mapMode, setMapMode] = useState(false);
  const [asset, setAsset] = useState<IAssetForm>();

  const totalAsset = asset !== undefined ? asset.cash + asset.FA : 0;

  const markersRef = useRef<any[]>([]);
  const markerClusteringRef = useRef<any>();
  const updateMarkers = useCallback(
    async (map: any) => {
      // console.log("Current geocodeData:", geocodeData); // 여기서 geocodeData 상태를 확인
      const mapBounds = map.getBounds();
      const processedPositions = new Set<string>();

      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // 기존의 api에서 가져온 데이터, 새로 등록한 데이터
      allGeocodeData?.forEach((geocodeData) => {
        const position = new window.naver.maps.LatLng(geocodeData.geocode?.latitude, geocodeData.geocode?.longitude);
        const positionKey = `${geocodeData.geocode?.latitude},${geocodeData.geocode?.longitude}`;

        if (mapBounds.hasLatLng(position) === true && !processedPositions.has(positionKey)) {
          const marker = createMarker({ geocodeData, matchingData, setSelectedMarkerData, mapMode, totalAsset });
          markersRef.current.push(marker);
          processedPositions.add(positionKey); // 이미 처리한 위치는 Set에 추가
        }
      });
      // 기존의 api에서 가져온 데이터, 새로 등록한 데이터
      // registeredGeocodeDatas.newDatas?.forEach((newData) => {
      //   const position = new window.naver.maps.LatLng(newData.geocode?.latitude, newData.geocode?.longitude);
      //   const positionKey = `${newData.geocode?.latitude},${newData.geocode?.longitude}`;

      //   if (mapBounds.hasLatLng(position) === true && !processedPositions.has(positionKey)) {
      //     const marker = createMarkerUser({ newData: registeredGeocodeDatas.matchingData, setSelectedMarkerData });
      //     markersRef.current.push(marker);
      //     processedPositions.add(positionKey); // 이미 처리한 위치는 Set에 추가
      //   }
      // });

      if (markerClusteringRef.current != null) {
        markerClusteringRef.current.setMap(null);
      }
      markerClusteringRef.current = clusteringOptions(map, markersRef.current);

      const markerDataArray: IGeocodeData[] = markersRef.current.map((marker) => marker.get("data"));

      setVisibleMarkerData(markerDataArray);
      setSelectedMarkerData(undefined);
    },
    [allGeocodeData, matchingData, setVisibleMarkerData, setSelectedMarkerData, mapMode, totalAsset]
  );

  const isClusterScriptLoadedRef = useRef(false);
  const loadClusterScript = useCallback(
    (map: any) => {
      if (isClusterScriptLoadedRef.current) {
        // console.log("클러스터 스크립트가 이미 로드되었습니다.");

        // 기존 리스너 제거 후 등록
        window.naver.maps.Event.clearListeners(map, "idle");
        window.naver.maps.Event.addListener(map, "idle", () => {
          void updateMarkers(map);
        });
        void updateMarkers(map);
        return;
      }

      const MARKER_CLUSTERING_SCRIPT_URL = "/libraries/markerClustering.js";
      loadScript(MARKER_CLUSTERING_SCRIPT_URL, () => {
        try {
          // console.log("클러스터를 실행합니다.");
          isClusterScriptLoadedRef.current = true; // 스크립트가 로드되었음을 기록

          window.naver.maps.Event.addListener(map, "idle", () => {
            void updateMarkers(map);
          });
          void updateMarkers(map);
        } catch (error) {
          console.error("클러스터 스크립트 로드 중 오류 발생:", error);
        }
      });
    },
    [updateMarkers]
  );
  const onMapLoaded = useCallback(
    (map: any) => {
      // 첫 번째 geocode를 중심 좌표로 설정
      if (geocode !== undefined) {
        const firstPosition = new window.naver.maps.LatLng(geocode.latitude, geocode.longitude);
        map.setCenter(firstPosition); // 지도 중심 설정
      }

      loadClusterScript(map); // 클러스터 스크립트 로드
    },
    [geocode, loadClusterScript]
  );
  const { mapLoading } = useMapsLoader({ onMapLoaded });

  return (
    <S.Container>
      {mapLoading ? (
        <LoadingSpinner size={100} />
      ) : (
        <>
          <div className="menuContainer">
            {!mapLoading && <RegionSelect setRegionName={setRegionName} setRegionCode={setRegionCode} />}
            <MapMode mapMode={mapMode} setMapMode={setMapMode} asset={asset} setAsset={setAsset} />
          </div>
          <div id="map"></div>
          {allGeocodeDataLoading && <LoadingSpinner size={100} />}
        </>
      )}
    </S.Container>
  );
}
