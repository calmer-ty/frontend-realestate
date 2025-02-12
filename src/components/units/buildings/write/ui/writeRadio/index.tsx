import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Controller } from "react-hook-form";

import type { IWriteForm } from "@/src/commons/types";
import type { Control } from "react-hook-form";
interface IControlRadioProps {
  label: string;
  name: keyof IWriteForm;
  selectLabels: string[]; // 라벨을 배열로 받도록 변경
  control?: Control<IWriteForm>;
}

export default function WriteRadio({ label, name, selectLabels, control }: IControlRadioProps): JSX.Element {
  return (
    <FormControl>
      <FormLabel id="write-radio-label">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <RadioGroup row aria-labelledby="write-radio-group" value={field.value} onChange={field.onChange}>
              {selectLabels.map((label, index) => (
                <FormControlLabel key={index} value={label} control={<Radio />} label={label} />
              ))}
            </RadioGroup>
          );
        }}
      />
    </FormControl>
  );
}
