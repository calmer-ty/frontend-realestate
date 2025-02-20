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

export default function WriteSelect({ label, notice, selecteItems, required, name, control }: IControlSelect): JSX.Element {
  return (
    <FormControl fullWidth required={required}>
      <InputLabel id="write-select-label">{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select labelId="write-select-label" id="write-select" label={label} {...field} value={field.value ?? ""}>
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
