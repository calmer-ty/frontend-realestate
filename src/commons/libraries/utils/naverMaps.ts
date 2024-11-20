import { getShortenedCityName } from "./cityNameShortener";
import { DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE } from "../../constants";

import type { IFirestore, IMapMarker } from "@/src/commons/types";

interface IClusterIcon {
  content: string;
  size: any;
  anchor: any;
}

interface IGetMapInitOptionsProps {
  center: any;
  zoom: number;
  zoomControl: boolean;
  zoomControlOptions: {
    position: any;
    style: any;
  };
}

// useAllMarkerMaps 안에 들어가는 마커
const containerCommon = `
  min-width: 67px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  color: #FFF;
`;

const topAreaCommon = `
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px 5px 0 0; /* 상단 좌우 모서리 반경 지정 */
  color: #FFF;
`;

const arrowCommon = `
  width: 14px;
  height: 14px;
  background-color: #FFF;
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(135deg);
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
`;

const markerStyle = {
  container: `
    ${containerCommon}
    border: 1px solid #888;
  `,
  containerActive: `
    ${containerCommon}
    border: 1px solid #1565c0;
  `,
  topArea: `
    ${topAreaCommon}
    border: 1px solid #888;
    background-color: #888;
  `,
  topAreaActive: `
    ${topAreaCommon}
    border: 1px solid #1565c0;
    background-color: #1565c0;
  `,
  bottomArea: `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    column-gap: 4px;
    padding: 2px;
    background-color: #FFF;
    color: #000;
    text-align: center;
    border-radius: 0 0 5px 5px; /* 하단 좌우 모서리 반경 지정 */
  `,
  bottom_unit1: `
    font-size: 12px;
  `,
  arrow: `
    ${arrowCommon}
    border: 1px solid #888;
  `,
  arrowActive: `
    ${arrowCommon}
    border: 1px solid #1565c0;
  `,
};

const clusterStyle = {
  container: `
    width: 40px;
    height: 40px;
    background-size: contain;
    font-size: 10px;
    font-weight: bold;
    line-height: 42px;
    color: white;
    text-align: center;
    cursor: pointer;
  `,
};

export const loadScript = (src: string, onLoad: () => void): void => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.async = true;
  script.onload = onLoad;
  document.head.appendChild(script);
};

export const getMapInitOptions: () => IGetMapInitOptionsProps = () => ({
  center: new window.naver.maps.LatLng(37.3595704, 127.105399),
  zoom: 10,
  zoomControl: true,
  zoomControlOptions: {
    position: window.naver.maps.Position.TOP_RIGHT,
    style: window.naver.maps.ZoomControlStyle.SMALL,
  },
});

export const markerIconContent = (buildingsData: IMapMarker, firestoreDatas: IFirestore[]): string => {
  const matchedFirestoreData = firestoreDatas.find(
    (firestoreData) =>
      firestoreData.address === getShortenedCityName(buildingsData.address ?? DEFAULT_STRING_VALUE) ||
      firestoreData.address === getShortenedCityName(buildingsData.address_road ?? DEFAULT_STRING_VALUE)
  );
  let price = ((buildingsData.price ?? DEFAULT_NUMBER_VALUE) / 10000).toFixed(1);
  price = price.endsWith(".0") ? price.slice(0, -2) : price;

  // 공통 스타일
  const area = ` <div style="${matchedFirestoreData !== undefined ? markerStyle.topAreaActive : markerStyle.topArea}">${Math.round((buildingsData.area ?? DEFAULT_NUMBER_VALUE) * 0.3025)}평</div>`;
  const priceDisplay = `<div style="${markerStyle.bottomArea}"><span style="${markerStyle.bottom_unit1}">매</span> <strong>${price}억</strong></div>`;
  const arrow = `<div style="${matchedFirestoreData !== undefined ? markerStyle.arrowActive : markerStyle.arrow}"></div>`;

  return `
      <div style="${matchedFirestoreData !== undefined ? markerStyle.containerActive : markerStyle.container}">
        ${area}
        ${priceDisplay}
        ${arrow}
      </div>`;
};

// 클러스터
const createClusterIcons = (): IClusterIcon[] => {
  const icons = [];
  for (let i = 1; i <= 5; i++) {
    icons.push({
      content: `<div style="${clusterStyle.container} background-image: url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-${i}.png);"></div>`,
      size: new window.naver.maps.Size(40, 40),
      anchor: new window.naver.maps.Point(20, 20),
    });
  }
  return icons;
};
export const createMarkerClusteringOptions = (map: any, markers: any[]): any => {
  return new window.MarkerClustering({
    minClusterSize: 2,
    maxZoom: 13,
    map,
    markers,
    disableClickZoom: false,
    gridSize: 120,
    icons: createClusterIcons(),
    indexGenerator: [10, 100, 200, 500, 1000],
    stylingFunction: (clusterMarker: any, count: any) => {
      clusterMarker.getElement().querySelector("div:first-child").innerText = count;
    },
  });
};
