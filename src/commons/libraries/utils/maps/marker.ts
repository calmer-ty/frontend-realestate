import { DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import { getShortenedCityName } from "../cityNameShortener";

import type { IFirestore, ILocationData } from "@/src/commons/types";
import { markerStyle } from "./styles";

export const markerIconContent = (buildingsData: ILocationData, firestoreDatas: IFirestore[]): string => {
  const matchedFirestoreData = firestoreDatas.find(
    (firestoreData) =>
      firestoreData.address === getShortenedCityName(buildingsData.address ?? DEFAULT_STRING_VALUE) ||
      firestoreData.address === getShortenedCityName(buildingsData.address_road ?? DEFAULT_STRING_VALUE)
  );
  let price = ((buildingsData.price ?? DEFAULT_NUMBER_VALUE) / 10000).toFixed(1);
  price = price.endsWith(".0") ? price.slice(0, -2) : price;

  // 공통 스타일
  const area = `<div style="${matchedFirestoreData !== undefined ? markerStyle.topAreaActive : markerStyle.topArea}">${Math.round((buildingsData.area ?? DEFAULT_NUMBER_VALUE) * 0.3025)}평</div>`;
  const priceDisplay = `<div style="${markerStyle.bottomArea}"><span style="${markerStyle.bottom_unit1}">매</span> <strong>${price}억</strong></div>`;
  const arrow = `<div style="${matchedFirestoreData !== undefined ? markerStyle.arrowActive : markerStyle.arrow}"></div>`;

  return `
    <div style="${matchedFirestoreData !== undefined ? markerStyle.containerActive : markerStyle.container}">
      ${area}
      ${priceDisplay}
      ${arrow}
    </div>`;
};
