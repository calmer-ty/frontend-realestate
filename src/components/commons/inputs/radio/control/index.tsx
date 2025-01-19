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
  // selectLabel1: string;
  // selectLabel2: string;
  selectLabels: string[]; // 라벨을 배열로 받도록 변경
  control: Control<IWriteForm>;
}

export default function ControlRadio(props: IControlRadioProps): JSX.Element {
  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">{props.label}</FormLabel>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.selectLabels[0]}
        render={({ field }) => {
          return (
            <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group" value={field.value} onChange={field.onChange}>
              {/* <FormControlLabel value={props.selectLabel1} control={<Radio />} label={props.selectLabel1} />
              <FormControlLabel value={props.selectLabel2} control={<Radio />} label={props.selectLabel2} /> */}
              {props.selectLabels.map((label, index) => (
                <FormControlLabel key={index} value={label} control={<Radio />} label={label} />
              ))}
            </RadioGroup>
          );
        }}
      />
    </FormControl>
  );
}
