import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function NoDataMessage({ text }: { text: string }): JSX.Element {
  return (
    <Box sx={{ display: "flex", flexDirection: " column", justifyContent: " center", alignItems: " center", rowGap: " 0.625rem", height: "100%", padding: "3.75rem 2.5rem" }}>
      <ErrorOutlineIcon fontSize="large" />
      <Typography sx={{ maxWidth: "13.75rem", textAlign: "center", wordBreak: "keep-all" }}>{text}</Typography>
    </Box>
  );
}
