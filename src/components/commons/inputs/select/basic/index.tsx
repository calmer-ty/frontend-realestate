import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import { engToKor } from "@/src/commons/libraries/utils/convertCollection";
import type { IControlSelect } from "./types";

export default function BasicSelect(props: IControlSelect): JSX.Element {
  return (
    <FormControl fullWidth required={props.required}>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>

      <Select labelId="demo-simple-select-label" id="demo-simple-select" label={props.label} value={engToKor(props.type)}>
        <MenuItem value="">
          <em>{props.notice}</em>
        </MenuItem>
        {props.selecteItems.map((el, index) => (
          <MenuItem key={`${el}_${index}`} value={el}>
            {el}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
