import { Box } from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

import { colors } from "@/src/commons/styles";

export default function BasicUnImage({ width, fontSize, height }: { width: string; height: string; fontSize: string }): JSX.Element {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: `${colors.blur}`, width, height, fontSize }}>
      <ImageNotSupportedIcon fontSize="inherit" />
    </Box>
  );
}
