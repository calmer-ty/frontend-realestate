import { useEffect, useState } from "react";
// Firebase
import { db } from "@/pages/api/firebase";
import { collection, getDocs } from "firebase/firestore";

import MapInfo from "./mapInfo";
import MapView from "./mapView";
import { useNaverMap } from "@/src/hooks/useNaverMap";
import { shortenCityName } from "@/src/commons/libraries/utils";

import type { IFirebaseData, IMarkerData } from "@/src/types";
import type { INaverMapProps } from "./types";

import { mapStyle } from "./styles";

export default function NaverMap(props: INaverMapProps): JSX.Element {
  const { ncpClientId, geocodeResults } = props;
  const [markerDatas, setMarkerDatas] = useState<IMarkerData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IMarkerData | null>(null);

  const [firebaseDatas, setFirebaseDatas] = useState<IFirebaseData[]>([]);
  // 특정 패턴을 제거하는 함수

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

  // 셀렉트가 된 것만 파이어 베이스 데이터와 매칭
  const matchingFirebaseData = firebaseDatas.find((fbData) => fbData.address === shortenCityName(selectedMarkerData?.address ?? ""));

  if (matchingFirebaseData !== undefined) {
    console.log(`매칭된 데이터: selectedMarkerData address: ${selectedMarkerData?.address}, firebaseData address: ${matchingFirebaseData.address}`);
  } else {
    console.log(`매칭되지 않은 데이터: markerData address: ${selectedMarkerData?.address}`);
  }

  useNaverMap({ ncpClientId, geocodeResults, setMarkerDatas, setSelectedMarkerData, firebaseDatas });

  return (
    <>
      <div style={mapStyle}>
        <MapInfo markerDatas={markerDatas} selectedMarkerData={selectedMarkerData} matchingFirebaseData={matchingFirebaseData} />
        <MapView geocodeResults={props.geocodeResults} />
      </div>
    </>
  );
}
