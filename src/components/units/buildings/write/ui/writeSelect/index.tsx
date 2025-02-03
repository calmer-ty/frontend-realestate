import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import { InputLabel } from "@mui/material";

import type { IWriteForm } from "@/src/commons/types";
import type { Control } from "react-hook-form";
interface IControlSelect {
  label: string;
  notice: string;
  selecteItems: string[];
  required?: boolean;
  name: keyof IWriteForm;
  control: Control<IWriteForm>;
}

export default function WriteSelect(props: IControlSelect): JSX.Element {
  return (
    <FormControl fullWidth required={props.required}>
      <InputLabel id="write-select-label">{props.label}</InputLabel>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => (
          <Select labelId="write-select-label" id="write-select" label={props.label} {...field} value={field.value ?? ""}>
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
