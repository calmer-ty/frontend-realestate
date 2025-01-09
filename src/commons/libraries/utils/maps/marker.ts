import { getJibunAddress } from "@/src/commons/libraries/utils/addressUtils";

import { DEFAULT_NUMBER_VALUE } from "@/src/commons/constants";
import type { IFirestore, IGeocodeData } from "@/src/commons/types";
import "./styles.css";

const markerIconContent = (itemData: IGeocodeData, firestoreData: IFirestore[]): string => {
  const jibunAddress = getJibunAddress(itemData);

  const matchedFirestoreData = firestoreData.find((data) => data.address === jibunAddress);

  const amount = (Number(itemData.data?.dealAmount?.replace(/,/g, "") ?? "0") / 10000).toFixed(2);
  const peng = Math.round((itemData.data?.excluUseAr ?? DEFAULT_NUMBER_VALUE) * 0.3025);

  return `
    <div class="markerBox ${matchedFirestoreData !== undefined ? "hasData" : ""}">
      <div class="top">${peng}평</div>
      <div class="bottom"> 
      <span>매</span> <strong>${amount}억</strong></div>
    </div>`;
};

export const createMarker = (itemData: IGeocodeData, firestoreData: IFirestore[], setSelectedMarkerData: (data: IGeocodeData) => void): any => {
  if (itemData === null) return;
  const markerOptions = {
    position: new window.naver.maps.LatLng(itemData.geocode?.latitude, itemData.geocode?.longitude),
    map: null, // Set map to null initially
    icon: {
      content: markerIconContent(itemData, firestoreData),
    },
  };

  const marker = new window.naver.maps.Marker(markerOptions);
  marker.set("data", itemData);

  window.naver.maps.Event.addListener(marker, "click", () => {
    if (itemData.data !== undefined) {
      setSelectedMarkerData(itemData);
    }
  });

  return marker;
};
