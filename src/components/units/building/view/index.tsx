"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import { engToKor } from "@/src/commons/libraries/utils/convertCollection";

import LoadingSpinner from "@/src/components/commons/LoadingSpinner";
import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";
import MapsMenu from "./ui/mapsMenu";

import * as S from "./styles";
import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import type { IAssetForm, IBuildingItem, IBuildingParamsPromiseProps, IFirestore, IGeocode, IGeocodeData } from "@/src/commons/types";

export default function BuildingView({ params }: IBuildingParamsPromiseProps): JSX.Element {
  const [buildingType, setBuildingType] = useState<string | undefined>(undefined);

  const [selectedMarkerData, setSelectedMarkerData] = useState<IGeocodeData | undefined>(undefined);
  const [visibleMarkerData, setVisibleMarkerData] = useState<IGeocodeData[]>([]);
  // 구 선택 hook
  const [regionName, setRegionName] = useState<string | undefined>(undefined);
  const [regionCode, setRegionCode] = useState<string | undefined>(undefined);

  // 파이어스토어 데이터패치
  const [firestoreData, setFirestoreData] = useState<IFirestore[]>([]);
  const { readFirestores } = useFirestore();

  // 맵 모드
  const [mapMode, setMapMode] = useState(false);
  const [asset, setAsset] = useState<IAssetForm>();

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
    return { matchingData: matched, unMatchedData: notMatched };
  }, [allGeocodeData, firestoreData, buildingType]);

  // 맵 마커 로직

  // params를 비동기적으로 처리하려면 await로 기다려야 함
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const resolvedParams = await params;
      setBuildingType(resolvedParams.buildingType);
    };
    void fetchData();
  }, [params]);
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
  } else if (allGeocodeDataError !== null) {
    return <div>{allGeocodeDataError}</div>;
  }

  return (
    <S.Container>
      <MapsMenu buildingType={buildingType} />

      <S.MapsWrap>
        <MapsInfo
          selectedMarkerData={selectedMarkerData}
          visibleMarkerData={visibleMarkerData}
          setSelectedMarkerData={setSelectedMarkerData}
          matchingData={matchingData}
          buildingType={buildingType}
          mapMode={mapMode}
          asset={asset}
        />
        <NaverMaps
          geocode={geocode}
          allGeocodeData={allGeocodeData}
          allGeocodeDataLoading={allGeocodeDataLoading}
          matchingData={matchingData}
          setSelectedMarkerData={setSelectedMarkerData}
          setVisibleMarkerData={setVisibleMarkerData}
          setRegionName={setRegionName}
          setRegionCode={setRegionCode}
          mapMode={mapMode}
          setMapMode={setMapMode}
          asset={asset}
          setAsset={setAsset}
        />
      </S.MapsWrap>
    </S.Container>
  );
}
