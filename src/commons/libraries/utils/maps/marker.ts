import { DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import { getFullCityName } from "@/src/commons/libraries/utils/convertCityName";

import type { IFirestore, IGeocodeData } from "@/src/commons/types";
import "./styles.css";

const markerIconContent = (geocodeData: IGeocodeData, firestoreDatas: IFirestore[]): string => {
  const address = `${getFullCityName(geocodeData.data?.estateAgentSggNm ?? DEFAULT_STRING_VALUE)} ${geocodeData.data?.umdNm} ${geocodeData.data?.jibun}`;

  const matchedFirestoreData = firestoreDatas.find(
    (firestoreData) => firestoreData.address === address
    // ||   firestoreData.address === getReducedCityName(data.address_road ?? DEFAULT_STRING_VALUE)
  );

  return `
    <div class="markerBox ${matchedFirestoreData !== undefined ? "hasData" : ""}">
      <div class="top">${Math.round((geocodeData.data?.excluUseAr ?? DEFAULT_NUMBER_VALUE) * 0.3025)}평</div>
      <div class="bottom"> 
      <span>매</span> <strong>${(Number(geocodeData.data?.dealAmount?.replace(/,/g, "")) / 10000).toFixed(2)}억</strong></div>
    </div>`;
};

export const createMarker = (geocodeData: IGeocodeData, firestoreData: IFirestore[], setSelectedMarkerData: (data: IGeocodeData) => void): any => {
  if (geocodeData === null) return;
  const markerOptions = {
    position: new window.naver.maps.LatLng(geocodeData.geocode?.latitude, geocodeData.geocode?.longitude),
    map: null, // Set map to null initially
    icon: {
      content: markerIconContent(geocodeData, firestoreData),
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
