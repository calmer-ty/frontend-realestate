import { clusterStyle } from "./styles";

interface IClusterIcon {
  content: string;
  size: any;
  anchor: any;
}

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
