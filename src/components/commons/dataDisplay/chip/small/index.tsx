import { Chip } from "@mui/material";
import type { ISmallChip } from "./types";

export default function SmallChip(props: ISmallChip): JSX.Element {
  return <Chip label={props.label} size="small" variant="outlined" />;
}
