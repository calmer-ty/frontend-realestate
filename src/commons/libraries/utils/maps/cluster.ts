import "./styles.css";

interface IClusterIcon {
  content: string;
  size: any;
  anchor: any;
}

const createClusterIcons = (): IClusterIcon[] => {
  const icons = [];
  for (let i = 1; i <= 5; i++) {
    icons.push({
      content: `<div class="cluster" style="background-image: url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-${i}.png);"></div>`,
      size: new window.naver.maps.Size(40, 40),
      anchor: new window.naver.maps.Point(20, 20),
    });
  }
  return icons;
};

export const clusteringOptions = (map: any, markers: any[]): any => {
  return new window.MarkerClustering({
    minClusterSize: 5, // 클러스터 최소 마커 개수 증가
    maxZoom: 18, // 최대 줌 레벨 최적화
    map,
    markers,
    disableClickZoom: false,
    gridSize: 300, // 그리드 크기 최적화
    icons: createClusterIcons(),
    indexGenerator: [10, 20, 50, 100, 200],
    stylingFunction: (clusterMarker: any, count: any) => {
      clusterMarker.getElement().querySelector("div:first-child").innerText = count;
    },
  });
};
