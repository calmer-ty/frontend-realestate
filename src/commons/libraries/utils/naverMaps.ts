import { shortenCityName } from "./regex";
import { clusterStyle, markerStyle } from "@/src/commons/styles/styles";
import type { IFirestore, IMapMarker } from "@/src/commons/types";

interface IGetMapInitOptionsProps {
  center: any;
  zoom: number;
  zoomControl: boolean;
  zoomControlOptions: {
    position: any;
    style: any;
  };
}
interface IClusterIcon {
  content: string;
  size: any;
  anchor: any;
}

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
    (firestoreData) => firestoreData.address === shortenCityName(buildingsData.address ?? "값 없음") || firestoreData.address === shortenCityName(buildingsData.address_road ?? "값 없음")
  );
  let price = ((buildingsData.price ?? NaN) / 10000).toFixed(1);
  price = price.endsWith(".0") ? price.slice(0, -2) : price;

  // 공통 스타일
  const area = ` <div style="${matchedFirestoreData !== undefined ? markerStyle.topAreaActive : markerStyle.topArea}">${Math.round((buildingsData.area ?? NaN) * 0.3025)}평</div>`;
  const priceDisplay = `<div style="${markerStyle.bottomArea}"><span style="${markerStyle.bottom_unit1}">매</span> <strong>${price}억</strong></div>`;
  const arrow = `<div style="${matchedFirestoreData !== undefined ? markerStyle.arrowActive : markerStyle.arrow}"></div>`;

  return `
      <div style="${matchedFirestoreData !== undefined ? markerStyle.containerActive : markerStyle.container}">
        ${area}
        ${priceDisplay}
        ${arrow}
      </div>`;
  // }
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
