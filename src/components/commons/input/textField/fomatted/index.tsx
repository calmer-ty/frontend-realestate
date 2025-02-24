import { forwardRef } from "react";

import { NumericFormat as _NumericFormat } from "react-number-format";
import TextField from "@mui/material/TextField";

import { Controller } from "react-hook-form";
import type { UseFormRegisterReturn, Control } from "react-hook-form";
import type { IAssetForm } from "@/src/commons/types";
interface IFormattedInputsProps {
  label: string;
  name: keyof IAssetForm;
  required?: boolean;
  register?: UseFormRegisterReturn;
  control: Control<IAssetForm, any>;
}

const NumericFormat = forwardRef<HTMLInputElement, any>((props, ref) => <_NumericFormat {...props} customInput={TextField} thousandSeparator valueIsNumericString prefix="₩ " inputRef={ref} />);
NumericFormat.displayName = "NumericFormat"; // displayName 추가

export default function FormattedInputs({ required, label, name, register, control }: IFormattedInputsProps): JSX.Element {
  // const [value, setValue] = useState(0);

  // const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
  //   setValue(value);
  // };

  return (
    <Controller
      name={name}
      control={control} // 전달받은 control을 사용
      render={({ field }) => <NumericFormat {...field} label={label} required={required} />}
    />
  );
}
