export const mapStyle = {
  container: {
    width: "100%",
    height: "100%",
  },
  info: {
    position: "absolute",
    color: "#FFF",
  },
} as const;
export const markerStyle = {
  container: `
      position: relative;
      min-width: 56px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #254336;
      border-radius: 5px;
      color: #FFF;
    `,
  top: `
      width: 100%;
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
      background-color: #6B8A7A;
      text-align: center;
    `,
  bottom: `
      width: 100%;
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
      border: 1px solid #254336;
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
    `,
};
