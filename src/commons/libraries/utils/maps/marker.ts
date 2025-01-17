import { DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import "./styles.css";

import type { IFirestore, IGeocodeData } from "@/src/commons/types";
interface IMarkerIconContentParams {
  geocodeData: IGeocodeData;
  firestoreDatas: IFirestore[];
}
interface ICreateMarkerParams {
  geocodeData: IGeocodeData;
  firestoreDatas: IFirestore[];
  setSelectedMarkerData: (data: IGeocodeData) => void;
}

const markerIconContent = ({ geocodeData, firestoreDatas }: IMarkerIconContentParams): string => {
  const addresses = [geocodeData.geocode?.jibunAddress, geocodeData.geocode?.roadAddress].map((address) => address);
  const matchedData = firestoreDatas.find((data) => addresses.includes(data.address ?? DEFAULT_STRING_VALUE));

  const amount = (Number(geocodeData.data?.dealAmount?.replace(/,/g, "") ?? "0") / 10000).toFixed(2);
  const peng = Math.round((geocodeData.data?.excluUseAr ?? DEFAULT_NUMBER_VALUE) * 0.3025);

  return `
    <div class="markerBox ${matchedData !== undefined ? "hasData" : ""}">
      <div class="top">${peng}평</div>
      <div class="bottom"> 
      <span>매</span> <strong>${amount}억</strong></div>
    </div>`;
};

export const createMarker = ({ geocodeData, firestoreDatas, setSelectedMarkerData }: ICreateMarkerParams): any => {
  if (geocodeData === null) return;
  const markerOptions = {
    position: new window.naver.maps.LatLng(geocodeData.geocode?.latitude, geocodeData.geocode?.longitude),
    map: null, // Set map to null initially
    icon: {
      content: markerIconContent({ geocodeData, firestoreDatas }),
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
