import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import { InputLabel } from "@mui/material";
import type { IControlSelect } from "./types";

export default function ControlSelect(props: IControlSelect): JSX.Element {
  const { required, label, name, notice, selecteItems, control } = props;

  return (
    <FormControl fullWidth required={required}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select labelId="demo-simple-select-label" id="demo-simple-select" label={label} {...field}>
            <MenuItem value="">
              <em>{notice}</em>
            </MenuItem>
            {selecteItems.map((el, index) => (
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
