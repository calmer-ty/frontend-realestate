import { Chip } from "@mui/material";

import type { ChipProps } from "@mui/material";
interface IBasicChip {
  label: string;
  size: ChipProps["size"];
}

export default function BasicChip(props: IBasicChip): JSX.Element {
  return <Chip label={props.label} size={props.size} variant="outlined" />;
}
