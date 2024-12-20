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
    minClusterSize: 3, // 클러스터 최소 마커 개수 증가
    maxZoom: 20, // 가까운 줌에서도 클러스터 유지
    map,
    markers,
    disableClickZoom: false,
    gridSize: 200, // 그리드 크기 감소로 렌더링 밀도 조절
    icons: createClusterIcons(),
    indexGenerator: [10, 100, 200, 500, 1000],
    stylingFunction: (clusterMarker: any, count: any) => {
      clusterMarker.getElement().querySelector("div:first-child").innerText = count;
    },
  });
};
