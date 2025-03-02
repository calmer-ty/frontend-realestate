import { Box, Skeleton } from "@mui/material";

export default function ImgSkeleton({ height }: { height: string }): JSX.Element {
  return (
    <Box sx={{ flex: "1" }}>
      <Skeleton width="100%" height={height} animation="wave" variant="rectangular" />
      <Box sx={{ paddingTop: "0.25rem" }}>
        <Skeleton width="100%" animation="wave" />
        <Skeleton width="100%" animation="wave" />
        <Skeleton width="60%" animation="wave" />
      </Box>
    </Box>
  );
}
