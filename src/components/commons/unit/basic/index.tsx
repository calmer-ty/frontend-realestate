import { Box } from "@mui/material";

export default function BasicUnit({ label }: { label: string }): JSX.Element {
  return <Box sx={{ flexShrink: "0" }}>{label}</Box>;
}
