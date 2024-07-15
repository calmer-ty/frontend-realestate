export const mapStyle = {
  container: {
    width: "100%",
    height: "100%",
  },
  // message
  message: {
    loading: {
      position: "absolute",
      top: "50%",
      left: "50%",
      zIndex: "2",
      transform: "translate(-50%,-50%)",
      color: "red",
      backgroundColor: "#dedede",
    },
    null: {
      position: "absolute",
      top: "50%",
      left: "50%",
      zIndex: "2",
      transform: "translate(-50%,-50%)",
      color: "red",
      backgroundColor: "#dedede",
    },
  },
  info: {
    overflowY: "auto",
    position: "absolute",
    top: "0",
    left: "0",
    width: "400px",
    height: "100%",
    border: "1px solid #dedede",
    backgroundColor: "#fff",
    zIndex: "1",

    selector: {
      container: {
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",
        padding: "15px",
      },
      apartmentName: {
        fontSize: "24px",
      },
      recentDeal: {
        container: {
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
        },
        title: {
          fontSize: "16px",
          fontWeight: "bold",
        },
        content: {
          padding: "20px",
          border: "1px solid #bcbcbc",
          borderRadius: "10px",
          backgroundColor: "#efefef",
        },
      },
    },

    list: {
      item: {
        container: {
          padding: "10px 15px",
          borderTop: "1px solid #dedede",
        },
        amount: {
          fontSize: "20px",
        },
      },
    },
  },
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
