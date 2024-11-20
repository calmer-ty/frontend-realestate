// useAllMarkerMaps 안에 들어가는 마커
const containerCommon = `
    min-width: 67px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    color: #fff;
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));
`;

const topAreaCommon = `
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px 5px 0 0;
  color: #fff;
`;

const arrowCommon = `
//   width: 14px;
//   height: 14px;
//   background-color: #fff;
//   position: absolute;
//   bottom: -6px;
//   left: 50%;
//   transform: translateX(-50%) rotate(135deg);
//   clip-path: polygon(0% 0%, 100% 0%, 100% 100%);

    width: 0;
    height: 0;
    border-style: solid;
    border-width: 12px 12px 0px 0px;
    border-color: #fff transparent transparent transparent;
    position: absolute;
    bottom: -10px;
    left: 0;
`;

export const markerStyle = {
  container: `
    ${containerCommon}
    // border: 1px solid #888;
  `,
  containerActive: `
    ${containerCommon}
    // border: 1px solid #1565c0;
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
    background-color: #fff;
    color: #000;
    text-align: center;
    border-radius: 0 0 5px 5px; /* 하단 좌우 모서리 반경 지정 */
  `,
  bottom_unit1: `
    font-size: 12px;
  `,
  arrow: `
    ${arrowCommon}
    // border: 1px solid #888;
  `,
  arrowActive: `
    ${arrowCommon}
    // border: 1px solid #1565c0;
  `,
};
export const clusterStyle = {
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
