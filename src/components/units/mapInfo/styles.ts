export const infoStyle = {
  container: {
    overflowY: "auto",
    width: "30%",
    height: "100%",
    border: "1px solid #dedede",
    backgroundColor: "#fff",
    zIndex: "1",
  },

  selector: {
    wrap: {
      display: "flex",
      flexDirection: "column",
      rowGap: "20px",
      padding: "15px",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      rowGap: "10px",
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
} as const;
