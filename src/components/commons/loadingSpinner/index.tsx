import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingSpinner(): JSX.Element {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", position: "absolute", top: "0" }}>
      <CircularProgress size="4rem" />
    </Box>
  );
}
