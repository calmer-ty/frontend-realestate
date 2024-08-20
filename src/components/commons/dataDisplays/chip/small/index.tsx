import { Chip } from "@mui/material";
import type { IChipBasic } from "./types";

export default function ChipSmall(props: IChipBasic): JSX.Element {
  return <Chip label={props.label} size="small" variant="outlined" />;
}
