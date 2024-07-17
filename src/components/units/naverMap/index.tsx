import { useEffect, useState } from "react";
// Firebase
import { db } from "@/pages/api/firebase";
import { collection, getDocs } from "firebase/firestore";

import MapInfo from "./mapInfo";
import MapView from "./mapView";
import { useNaverMap } from "@/src/hooks/useNaverMap";

import type { IMarkerData } from "@/src/types";
import type { INaverMapProps } from "./types";
import type { IFirebaseData } from "./mapInfo/types";
import { mapStyle } from "./styles";

export default function NaverMap(props: INaverMapProps): JSX.Element {
  const { ncpClientId, geocodeResults } = props;
  const [markerDatas, setMarkerDatas] = useState<IMarkerData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IMarkerData | null>(null);

  const [firebaseDatas, setFirebaseDatas] = useState<IFirebaseData[]>([]);
  // 특정 패턴을 제거하는 함수
  const removeSpecialCity = (address: string): string => {
    return address
      .replace(/서울특별시/, "서울")
      .replace(/부산광역시/, "부산")
      .replace(/대구광역시/, "대구")
      .replace(/인천광역시/, "인천")
      .replace(/광주광역시/, "광주")
      .replace(/대전광역시/, "대전")
      .replace(/울산광역시/, "울산")
      .replace(/경기도/, "경기")
      .replace(/충청북도/, "충북")
      .replace(/충청남도/, "충남")
      .replace(/전라남도/, "전남")
      .replace(/경상북도/, "경북")
      .replace(/경상남도/, "경남");
    // .replace(/강원특별자치도 /, "강원")
    // .replace(/세종특별자치시/, "세종")
    // .replace(/제주특별자치도/, "제주")
    // .replace(/전북특별자치도/, "전북")
  };
  useEffect(() => {
    const fetchBuildings = async (): Promise<void> => {
      try {
        // const collectionName = getFirestoreCollectionName(selectedOption);
        const querySnapshot = await getDocs(collection(db, "apartment")); // 'building' 컬렉션을 참조합니다
        const datas = querySnapshot.docs.map((el) => {
          const data = el.data();
          // 속성 순서를 일정하게 유지하여 새로운 객체 생성
          return {
            address: data.address,
            addressDetail: data.addressDetail,
          };
        });
        setFirebaseDatas(datas); // 데이터 상태 업데이트
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };
    void fetchBuildings();
  }, []);
  const matchingFirebaseData = firebaseDatas.find((fbData) => fbData.address === removeSpecialCity(selectedMarkerData?.address ?? ""));

  console.log(matchingFirebaseData);
  if (matchingFirebaseData !== undefined) {
    console.log(`매칭된 데이터: selectedMarkerData address: ${selectedMarkerData?.address}, firebaseData address: ${matchingFirebaseData.address}`);
  } else {
    console.log(`매칭되지 않은 데이터: markerData address: ${selectedMarkerData?.address}`);
  }

  useNaverMap({ ncpClientId, geocodeResults, setMarkerDatas, setSelectedMarkerData });

  return (
    <>
      <div style={mapStyle}>
        <MapInfo markerDatas={markerDatas} selectedMarkerData={selectedMarkerData} matchingFirebaseData={matchingFirebaseData} />
        <MapView geocodeResults={props.geocodeResults} />
      </div>
    </>
  );
}
