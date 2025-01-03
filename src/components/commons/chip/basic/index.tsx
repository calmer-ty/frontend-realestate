import { Chip } from "@mui/material";
import type { IBasicChip } from "./types";

export default function BasicChip(props: IBasicChip): JSX.Element {
  return <Chip label={props.label} size={props.size} variant="outlined" />;
}
