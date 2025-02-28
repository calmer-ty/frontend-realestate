import { Box } from "@mui/material";

export default function UnderlineTitle({ label, desc }: { label: string; desc?: string }): JSX.Element {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "0.1875rem solid #000", paddingBottom: "0.625rem" }}>
      <h2>{label}</h2>
      <p>{desc}</p>
    </Box>
  );
}
