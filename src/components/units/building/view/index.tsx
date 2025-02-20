"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import { loadScript } from "@/src/commons/libraries/utils/maps/init";
import { useMapsLoader } from "@/src/hooks/maps/useMapsLoader";
import { engToKor } from "@/src/commons/libraries/utils/convertCollection";

import LoadingSpinner from "@/src/components/commons/loadingSpinner";
import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";
import MapsMenu from "./ui/mapsMenu";

import * as S from "./styles";
import "./marker.css";
import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import type { IBuildingItem, IBuildingParamsPromiseProps, IFirestore, IGeocode, IGeocodeData } from "@/src/commons/types";
interface IMarkerIconContentParams {
  geocodeData: IGeocodeData;
  matchingData: IFirestore[];
}
interface ICreateMarkerParams {
  geocodeData: IGeocodeData;
  matchingData: IFirestore[];
  setSelectedMarkerData: (data: IGeocodeData) => void;
}
interface IClusterIcon {
  content: string;
  size: any;
  anchor: any;
}

const markerIconContent = ({ geocodeData, matchingData }: IMarkerIconContentParams): string => {
  const isMatched = matchingData.some((matchingData) => matchingData.address === geocodeData.geocode.jibunAddress || matchingData.address === geocodeData.geocode.roadAddress);

  const amount = (Number(geocodeData.data?.dealAmount?.replace(/,/g, "") ?? "0") / 10000).toFixed(2);
  const peng = Math.round(geocodeData.data?.excluUseAr * 0.3025);

  return `
    <div class="markerBox ${isMatched ? "hasData" : ""}">
      <div class="top">${peng}평</div>
      <div class="bottom"> 
      <span>매</span> <strong>${amount}억</strong></div>
    </div>`;
};

const createMarker = ({ geocodeData, matchingData, setSelectedMarkerData }: ICreateMarkerParams): any => {
  if (geocodeData === null) return;
  const markerOptions = {
    position: new window.naver.maps.LatLng(geocodeData.geocode?.latitude, geocodeData.geocode?.longitude),
    map: null, // Set map to null initially
    icon: {
      content: markerIconContent({ geocodeData, matchingData }),
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

export default function BuildingView({ params }: IBuildingParamsPromiseProps): JSX.Element {
  const [buildingType, setBuildingType] = useState<string | undefined>(undefined);
  // params를 비동기적으로 처리하려면 await로 기다려야 함
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const resolvedParams = await params;
      setBuildingType(resolvedParams.buildingType);
    };

    void fetchData();
  }, [params]);

  const [selectedMarkerData, setSelectedMarkerData] = useState<IGeocodeData | undefined>(undefined);
  const [visibleMarkerData, setVisibleMarkerData] = useState<IGeocodeData[]>([]);
  // 구 선택 hook
  const [regionName, setRegionName] = useState<string | undefined>(undefined);
  const [regionCode, setRegionCode] = useState<string | undefined>(undefined);

  // 파이어스토어 데이터패치
  const [firestoreData, setFirestoreData] = useState<IFirestore[]>([]);
  const { readFirestores } = useFirestore();

  useEffect(() => {
    const readBuilding = async (): Promise<void> => {
      const data = await readFirestores("buildings");
      setFirestoreData(data);
    };
    void readBuilding();
  }, [readFirestores]);

  // API 패치 훅
  // const fetchRegionData = useCallback(async (): Promise<void> => {
  //   try {
  //     const response = await axios.get("/api/fetchRegion");
  //     const data = response.data;
  //     return data;
  //   } catch (err) {
  //     console.error("Error fetching data:", err);
  //   }
  // }, []);
  const [buildingData, setBuildingData] = useState<IBuildingItem[]>([]);
  const fetchBuildingData = useCallback(async (): Promise<void> => {
    if (regionCode === undefined || regionName === undefined || buildingType === undefined) {
      console.error("존재하지 않는 지역입니다.");
      return;
    }

    try {
      const response = await axios.get<IBuildingItem[]>("/api/fetchBuilding", {
        params: { regionCode, regionName, buildingType },
      });

      if (response.status === 200) {
        setBuildingData(response.data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [regionCode, regionName, buildingType]);

  const [geocode, setGeocode] = useState<IGeocode | undefined>(undefined);
  const fetchGeocode = useCallback(
    async (): Promise<void> => {
      try {
        const response = await axios.get<IGeocode>("/api/fetchSelectGeocode", {
          params: { buildingType, regionName },
        });
        if (response.status === 200) {
          setGeocode(response.data);
          // console.log("Fetched geocode data:", response.data);
        } else {
          throw new Error("Failed to fetch geocode data");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    },
    [buildingType, regionName] // buildingType이 변경될 때만 함수가 재정의됨
  );

  // 지오코드 패치 로직
  const [allGeocodeData, setAllGeocodeData] = useState<IGeocodeData[]>([]);
  const [allGeocodeDataLoading, setAllGeocodeDataLoading] = useState<boolean>(true);
  const [allGeocodeDataError, setAllGeocodeDataError] = useState<string | null>(null);
  const fetchAllGeocodeData = useCallback(
    async (): Promise<void> => {
      setAllGeocodeDataLoading(true); // 데이터 요청 시작 시 로딩 상태 true로 설정
      setAllGeocodeDataError(null); // 이전 에러 상태 초기화
      try {
        const response = await axios.get<IGeocodeData[]>("/api/fetchAllGeocode", {
          params: { regionCode, buildingType },
        });
        if (response.status === 200) {
          setAllGeocodeData(response.data);
          // console.log("Fetched geocode data:", response.data);
        } else {
          throw new Error("Failed to fetch geocode data");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setAllGeocodeDataLoading(false); // 데이터 요청이 끝났으므로 로딩 상태 false로 설정
      }
    },
    [regionCode, buildingType] // buildingType이 변경될 때만 함수가 재정의됨
  );

  // 매칭/비매칭 데이터 판별
  const { matchingData } = useMemo(() => {
    const matched: IFirestore[] = [];
    const notMatched: IFirestore[] = [];

    // buildingType이 일치하는 데이터만 필터링
    const filteredData = firestoreData.filter((data) => data.buildingType === engToKor(buildingType ?? DEFAULT_STRING_VALUE));

    filteredData.forEach((data) => {
      // firestoreData와 allGeocodeData의 주소가 일치하는지 확인
      const isMatching = allGeocodeData.some((geoData) => {
        // jibunAddress 또는 rodeAddress가 firestoreData의 address에 포함되는지 확인
        return geoData.geocode.jibunAddress.includes(data.address) || geoData.geocode.roadAddress.includes(data.address);
      });

      if (isMatching) {
        matched.push(data);
      } else {
        notMatched.push(data);
      }
    });
    return { matchingData: matched, unMatchedDatas: notMatched };
  }, [allGeocodeData, firestoreData, buildingType]);

  // 맵 마커 로직
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
          const marker = createMarker({ geocodeData, matchingData, setSelectedMarkerData });
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
    [allGeocodeData, matchingData, setVisibleMarkerData, setSelectedMarkerData]
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
      // 첫 번째 geocodeDatas를 중심 좌표로 설정
      if (geocode !== undefined) {
        const firstPosition = new window.naver.maps.LatLng(geocode.latitude, geocode.longitude);
        map.setCenter(firstPosition); // 지도 중심 설정
      }

      loadClusterScript(map); // 클러스터 스크립트 로드
    },
    [geocode, loadClusterScript]
  );
  const { mapLoading } = useMapsLoader({ onMapLoaded });

  // 스테이트 값 바뀔 때마다 api 재요청 - 구 선택시 리렌더링
  useEffect(() => {
    if (regionName === undefined) return;
    void fetchGeocode();
  }, [regionName, fetchGeocode]);

  useEffect(() => {
    if (regionCode === undefined || buildingType === undefined) return;
    void fetchBuildingData();
  }, [regionCode, buildingType, fetchBuildingData]);

  // buildingData가 변경되면 지오코드 데이터를 요청 - buildingData 값 의존성 배열로 추가
  useEffect(() => {
    if (buildingData.length === 0) return;
    void fetchAllGeocodeData();
  }, [buildingData, fetchAllGeocodeData]);

  // buildingType이 null일 때 로딩 상태 표시
  if (buildingType === undefined) {
    return <LoadingSpinner size={100} />;
  }
  if (allGeocodeDataError !== null) return <div>{allGeocodeDataError}</div>;

  return (
    <S.Container>
      <MapsMenu buildingType={buildingType} />

      <S.MapsWrap>
        <MapsInfo
          selectedMarkerData={selectedMarkerData}
          visibleMarkerData={visibleMarkerData}
          setSelectedMarkerData={setSelectedMarkerData}
          matchingDatas={matchingData}
          buildingType={buildingType}
        />
        <NaverMaps mapLoading={mapLoading} allGeocodeDataLoading={allGeocodeDataLoading} setRegionName={setRegionName} setRegionCode={setRegionCode} />
      </S.MapsWrap>
    </S.Container>
  );
}
