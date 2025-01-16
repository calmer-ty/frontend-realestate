import { getReduceCityName } from "../convertCityName";

import { DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import "./styles.css";

import type { IFirestore, IGeocodeData } from "@/src/commons/types";
interface IMarkerIconContentParams {
  itemData: IGeocodeData;
  firestoreData: IFirestore[];
}
interface ICreateMarkerParams {
  itemData: IGeocodeData;
  firestoreData: IFirestore[];
  setSelectedMarkerData: (data: IGeocodeData) => void;
}

const markerIconContent = ({ itemData, firestoreData }: IMarkerIconContentParams): string => {
  const addresses = [itemData.geocode?.jibunAddress, itemData.geocode?.roadAddress].map((address) => getReduceCityName(address ?? DEFAULT_STRING_VALUE));
  const matchedData = firestoreData.find((data) => addresses.includes(data.address ?? DEFAULT_STRING_VALUE));

  const amount = (Number(itemData.data?.dealAmount?.replace(/,/g, "") ?? "0") / 10000).toFixed(2);
  const peng = Math.round((itemData.data?.excluUseAr ?? DEFAULT_NUMBER_VALUE) * 0.3025);

  return `
    <div class="markerBox ${matchedData !== undefined ? "hasData" : ""}">
      <div class="top">${peng}평</div>
      <div class="bottom"> 
      <span>매</span> <strong>${amount}억</strong></div>
    </div>`;
};

export const createMarker = ({ itemData, firestoreData, setSelectedMarkerData }: ICreateMarkerParams): any => {
  if (itemData === null) return;
  const markerOptions = {
    position: new window.naver.maps.LatLng(itemData.geocode?.latitude, itemData.geocode?.longitude),
    map: null, // Set map to null initially
    icon: {
      content: markerIconContent({ itemData, firestoreData }),
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
