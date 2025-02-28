import { Chip } from "@mui/material";

import type { ChipProps } from "@mui/material";

export default function BasicChip({ label, size }: { label: string; size: ChipProps["size"] }): JSX.Element {
  return <Chip label={label} size={size} variant="outlined" />;
}
