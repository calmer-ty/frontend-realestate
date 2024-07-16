export const mapStyle = {
  display: "flex",
  width: "100%",
  height: "calc(100vh - 60px)",
} as const;

export const markerStyle = {
  container: `
      position: relative;
      min-width: 58px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #1565c0;
      border-radius: 5px;
      color: #FFF;
    `,
  topArea: `
      width: 100%;
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
      background-color: #1565c0;
      text-align: center;
      font-weight: bold;
      &:click {
       background-color: #f00;
      }
    `,
  topAreaSelected: `
      width: 100%;
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
      background-color: #fff;
      text-align: center;
      font-weight: bold;
      color: #1565c0;
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
      width: 14px;
      height: 14px;
      background-color: #FFF;
      position: absolute;
      bottom: -7px;
      left: 50%;
      transform: translateX(-50%) rotate(135deg);
      border: 1px solid #1565c0;
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
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
