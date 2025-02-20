"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAllMarker } from "@/src/hooks/maps/useAllMarker";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import { engToKor } from "@/src/commons/libraries/utils/convertCollection";

import LoadingSpinner from "@/src/components/commons/loadingSpinner";
import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";
import MapsMenu from "./ui/mapsMenu";

import * as S from "./styles";
import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import type { IBuildingItem, IBuildingParamsPromiseProps, IFirestore, IGeocode, IGeocodeData } from "@/src/commons/types";

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
  const [visibleMarkerDatas, setVisibleMarkerDatass] = useState<IGeocodeData[]>([]);
  // 구 선택 hook
  const [regionName, setRegionName] = useState<string | undefined>(undefined);
  const [regionCode, setRegionCode] = useState<string | undefined>(undefined);

  // 파이어스토어 데이터패치
  const [firestoreDatas, setFirestoreDatas] = useState<IFirestore[]>([]);
  const { readFirestores } = useFirestore();

  useEffect(() => {
    const readBuilding = async (): Promise<void> => {
      const data = await readFirestores("buildings");
      setFirestoreDatas(data);
    };
    void readBuilding();
  }, [readFirestores]);

  // API 패치 훅
  // const { fetchRegionData } = useFetchRegionData();
  const [buildingDatas, setBuildingDatas] = useState<IBuildingItem[]>([]);
  const fetchBuildingDatas = useCallback(async (): Promise<void> => {
    if (regionCode === undefined || regionName === undefined || buildingType === undefined) {
      console.error("존재하지 않는 지역입니다.");
      return;
    }

    try {
      const response = await axios.get<IBuildingItem[]>("/api/fetchBuilding", {
        params: { regionCode, regionName, buildingType },
      });

      if (response.status === 200) {
        setBuildingDatas(response.data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [regionCode, regionName, buildingType]);

  const [geocode, setGeocodeData] = useState<IGeocode | undefined>(undefined);
  const fetchGeocodeData = useCallback(
    async (): Promise<void> => {
      try {
        const response = await axios.get<IGeocode>("/api/fetchSelectGeocode", {
          params: { buildingType, regionName },
        });
        if (response.status === 200) {
          setGeocodeData(response.data);
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
  const [geocodeDatas, setGeocodeDatas] = useState<IGeocodeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchGeocodeDatas = useCallback(
    async (): Promise<void> => {
      setLoading(true); // 데이터 요청 시작 시 로딩 상태 true로 설정
      setError(null); // 이전 에러 상태 초기화
      try {
        const response = await axios.get<IGeocodeData[]>("/api/fetchAllGeocode", {
          params: { regionCode, buildingType },
        });
        if (response.status === 200) {
          setGeocodeDatas(response.data);
          // console.log("Fetched geocode data:", response.data);
        } else {
          throw new Error("Failed to fetch geocode data");
        }
      } catch (err) {
        setError("Error fetching geocode data"); // 에러 발생 시 에러 메시지 설정
      } finally {
        setLoading(false); // 데이터 요청이 끝났으므로 로딩 상태 false로 설정
      }
    },
    [regionCode, buildingType] // buildingType이 변경될 때만 함수가 재정의됨
  );

  // 매칭/비매칭 데이터 판별
  const { matchingDatas } = useMemo(() => {
    const matched: IFirestore[] = [];
    const notMatched: IFirestore[] = [];

    firestoreDatas
      .filter((firestoreData) => firestoreData.buildingType === engToKor(buildingType ?? DEFAULT_STRING_VALUE))
      .forEach((firestoreData) => {
        // firestoreData와 geocodeDatas의 주소가 일치하는지 확인
        const isMatching = geocodeDatas.some((geocodeData) => {
          // jibunAddress 또는 rodeAddress가 firestoreData의 address에 포함되는지 확인
          return geocodeData.geocode.jibunAddress.includes(firestoreData.address) || geocodeData.geocode.roadAddress.includes(firestoreData.address);
        });

        if (isMatching) {
          matched.push(firestoreData);
        } else {
          notMatched.push(firestoreData);
        }
      });
    return { matchingDatas: matched, unMatchedDatas: notMatched };
  }, [geocodeDatas, firestoreDatas, buildingType]);

  // 스테이트 값 바뀔 때마다 api 재요청 - 구 선택시 리렌더링
  useEffect(() => {
    if (regionName === undefined) return;
    void fetchGeocodeData();
  }, [regionName, fetchGeocodeData]);

  useEffect(() => {
    if (regionCode === undefined || buildingType === undefined) return;
    void fetchBuildingDatas();
  }, [regionCode, buildingType, fetchBuildingDatas]);

  // buildingDatas가 변경되면 지오코드 데이터를 요청 - buildingDatas 값 의존성 배열로 추가
  useEffect(() => {
    if (buildingDatas.length === 0) return;
    void fetchGeocodeDatas();
  }, [buildingDatas, fetchGeocodeDatas]);

  const { loading: mapLoading } = useAllMarker({
    geocode,
    geocodeDatas,
    matchingDatas,
    setSelectedMarkerData,
    setVisibleMarkerDatass,
  });

  // buildingType이 null일 때 로딩 상태 표시
  if (buildingType === undefined) {
    return <LoadingSpinner size={100} />;
  }
  if (error !== null) return <div>{error}</div>;

  return (
    <S.Container>
      <MapsMenu buildingType={buildingType} />

      <S.MapsWrap>
        <MapsInfo
          selectedMarkerData={selectedMarkerData}
          visibleMarkerDatas={visibleMarkerDatas}
          setSelectedMarkerData={setSelectedMarkerData}
          matchingDatas={matchingDatas}
          buildingType={buildingType}
        />
        <NaverMaps mapLoading={mapLoading} dataLoading={loading} setRegionName={setRegionName} setRegionCode={setRegionCode} />
      </S.MapsWrap>
    </S.Container>
  );
}
