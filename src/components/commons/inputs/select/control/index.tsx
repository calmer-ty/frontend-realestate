import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import { InputLabel } from "@mui/material";
import type { IControlSelect } from "./types";

export default function ControlSelect(props: IControlSelect): JSX.Element {
  return (
    <FormControl fullWidth required={props.required}>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue=""
        render={({ field }) => (
          <Select labelId="demo-simple-select-label" id="demo-simple-select" label={props.label} {...field}>
            <MenuItem value="">
              <em>{props.notice}</em>
            </MenuItem>
            {props.selecteItems.map((el, index) => (
              <MenuItem key={`${el}_${index}`} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}
