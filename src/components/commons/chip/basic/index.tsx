import { Chip } from "@mui/material";

import type { ChipProps } from "@mui/material";
interface IBasicChip {
  label: string;
  size: ChipProps["size"];
}

export default function BasicChip({ label, size }: IBasicChip): JSX.Element {
  return <Chip label={label} size={size} variant="outlined" />;
}
