import BasicTextField from "@/src/components/commons/input/textField/basic";
import BasicUnit from "@/src/components/commons/unit/basic";

import * as S from "./styles";

import type { IAssetForm } from "@/src/commons/types";
import type { UseFormRegister } from "react-hook-form";
interface IInputUnitProps {
  label: string;
  type: string;
  register: ReturnType<UseFormRegister<IAssetForm>>;
  unitLabel: string;
  step?: string;
}

export default function InputUnit({ label, type, register, unitLabel, step }: IInputUnitProps): JSX.Element {
  return (
    <S.InputUnit>
      <BasicTextField required type={type} label={label} register={register} step={step} />
      <BasicUnit label={unitLabel} />
    </S.InputUnit>
  );
}
