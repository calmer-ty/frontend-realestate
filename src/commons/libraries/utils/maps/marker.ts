import "./styles.css";

import type { IFirestore, IGeocodeData } from "@/src/commons/types";
interface IMarkerIconContentParams {
  geocodeData: IGeocodeData;
  matchingDatas: IFirestore[];
}
interface ICreateMarkerParams {
  geocodeData: IGeocodeData;
  matchingDatas: IFirestore[];
  setSelectedMarkerData: (data: IGeocodeData) => void;
}
// interface IMarkerIconContentUserParams {
//   newData: IUserInputGeocodeData;
//   matchingDatas: IUserInputGeocodeData[];
// }
// interface ICreateMarkerUserParams {
//   newData: IUserInputGeocodeData;
//   matchingDatas: IUserInputGeocodeData[];
//   setSelectedMarkerData: (data: IGeocodeData) => void;
// }

const markerIconContent = ({ geocodeData, matchingDatas }: IMarkerIconContentParams): string => {
  const isMatched = matchingDatas.some((matchingData) => matchingData.address === geocodeData.geocode.jibunAddress || matchingData.address === geocodeData.geocode.roadAddress);

  const amount = (Number(geocodeData.data?.dealAmount?.replace(/,/g, "") ?? "0") / 10000).toFixed(2);
  const peng = Math.round(geocodeData.data?.excluUseAr * 0.3025);

  return `
    <div class="markerBox ${isMatched ? "hasData" : ""}">
      <div class="top">${peng}평</div>
      <div class="bottom"> 
      <span>매</span> <strong>${amount}억</strong></div>
    </div>`;
};

export const createMarker = (params: ICreateMarkerParams): any => {
  const { geocodeData, matchingDatas, setSelectedMarkerData } = params;

  if (geocodeData === null) return;
  const markerOptions = {
    position: new window.naver.maps.LatLng(geocodeData.geocode?.latitude, geocodeData.geocode?.longitude),
    map: null, // Set map to null initially
    icon: {
      content: markerIconContent({ geocodeData, matchingDatas }),
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
