import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Controller } from "react-hook-form";
import type { IControlRadioProps } from "./types";
import { useEffect } from "react";

export default function ControlRadio(props: IControlRadioProps): JSX.Element {
  const { label, name, control, setValue, selectLabel1, selectLabel2, hasValue } = props;
  console.log("hasValue", hasValue);
  // console.log("selectLabel1", selectLabel1);
  // console.log("selectLabel1", typeof selectLabel2);
  // console.log("control: ", control);

  useEffect(() => {
    if (hasValue !== undefined) {
      setValue(name, hasValue); // 데이터가 준비되면 값 설정
    }
  }, [hasValue, name, setValue]);
  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={hasValue ?? ""}
        render={({ field }) => {
          // 디버깅 로그 추가
          console.log("Controller field object:", field); // 추가 디버깅
          // console.log("Controller field value:", field.value);
          // console.log("Controller field onChange:", field.onChange);
          // console.log("hasValue prop:", hasValue);
          return (
            <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group" value={field.value} onChange={field.onChange}>
              <FormControlLabel value={selectLabel1} control={<Radio />} label={selectLabel1} />
              <FormControlLabel value={selectLabel2} control={<Radio />} label={selectLabel2} />
            </RadioGroup>
          );
        }}
      />
    </FormControl>
  );
}
