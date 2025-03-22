import { Box, Skeleton } from "@mui/material";

export default function ImgSkeleton(): JSX.Element {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Skeleton width="100%" height="100%" animation="wave" variant="rectangular" />
      <Box sx={{ paddingTop: "0.25rem" }}>
        <Skeleton width="100%" animation="wave" />
        <Skeleton width="100%" animation="wave" />
        <Skeleton width="60%" animation="wave" />
      </Box>
    </Box>
  );
}
