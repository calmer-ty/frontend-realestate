export const viewStyle = {
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
} as const;
