import { DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import { getShortenedCityName } from "../cityNameShortener";

import type { IFirestore, IGeocodeData } from "@/src/commons/types";
import { markerStyle } from "./styles";

const markerIconContent = (geocodeData: IGeocodeData, firestoreDatas: IFirestore[]): string => {
  const matchedFirestoreData = firestoreDatas.find(
    (firestoreData) => firestoreData.address === getShortenedCityName(geocodeData.geocode?.jibunAddress ?? DEFAULT_STRING_VALUE)
    // ||   firestoreData.address === getShortenedCityName(data.address_road ?? DEFAULT_STRING_VALUE)
  );
  // let price = ((data.dealAmount ?? DEFAULT_NUMBER_VALUE) / 10000).toFixed(1);
  // price = price.endsWith(".0") ? price.slice(0, -2) : price;

  // 공통 스타일
  const area = `<div style="${matchedFirestoreData !== undefined ? markerStyle.topAreaActive : markerStyle.topArea}">${Math.round(
    (geocodeData.data?.excluUseAr ?? DEFAULT_NUMBER_VALUE) * 0.3025
  )}평</div>`;
  const priceDisplay = `<div style="${markerStyle.bottomArea}"><span style="${markerStyle.bottom_unit1}">매</span> <strong>${geocodeData.data?.dealAmount}억</strong></div>`;
  const arrow = `<div style="${matchedFirestoreData !== undefined ? markerStyle.arrowActive : markerStyle.arrow}"></div>`;

  return `
    <div style="${matchedFirestoreData !== undefined ? markerStyle.containerActive : markerStyle.container}">
      ${area}
      ${priceDisplay}
      ${arrow}
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
