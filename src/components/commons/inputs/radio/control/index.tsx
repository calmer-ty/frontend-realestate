import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Controller } from "react-hook-form";
import type { IControlRadioProps } from "./types";

export default function ControlRadio(props: IControlRadioProps): JSX.Element {
  const { label, name, control, selectLabel1, selectLabel2, hasValue } = props;
  console.log("hasValue", hasValue);
  console.log("selectLabel1", selectLabel1);
  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={hasValue ?? ""}
        render={({ field }) => (
          <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group" value={field.value} onChange={field.onChange}>
            <FormControlLabel value={selectLabel1} control={<Radio />} label={selectLabel1} />
            <FormControlLabel value={selectLabel2} control={<Radio />} label={selectLabel2} />
          </RadioGroup>
        )}
      />
    </FormControl>
  );
}
