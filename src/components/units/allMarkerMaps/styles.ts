import { css } from "@emotion/react";

export const mapStyle = css`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
`;

// useAllMarkerMaps 안에 들어가는 마커
const containerCommon = `
  position: relative;
  min-width: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #888;
  border-radius: 5px;
  color: #FFF;
`;
const topAreaCommon = `
  position: relative;
  min-width: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius-top-left: 5px;
  border-radius-top-right: 5px;
  color: #FFF;
`;
const arrowCommon = `
  width: 14px;
  height: 14px;
  background-color: #FFF;
  position: absolute;
  bottom: -7px;
  left: 50%;
  transform: translateX(-50%) rotate(135deg);
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
`;

export const markerStyle = {
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
    align-items: center;
    width: 100%;
    column-gap: 4px;
    padding: 2px;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    background-color: #FFF;
    color: #000;
    text-align: center;
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

export const clusterStyle = {
  container: `
      width:40px;
      height:40px;
      background-size:contain;
      font-size:10px;
      font-weight:bold;
      line-height:42px;
      color:white;
      text-align:center;
      cursor:pointer;
    `,
};
