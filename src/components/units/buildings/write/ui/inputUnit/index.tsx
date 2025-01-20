import BasicTextField from "@/src/components/commons/inputs/textField/basic";
import BasicUnit from "@/src/components/commons/units/basic";

import * as S from "./styles";

import type { IWriteForm } from "@/src/commons/types";
import type { UseFormRegister } from "react-hook-form";
interface IInputUnitProps {
  label: string;
  type: string;
  register: ReturnType<UseFormRegister<IWriteForm>>;
  unitLabel: string;
  step?: string;
}

export default function InputUnit(props: IInputUnitProps): JSX.Element {
  const { label, type, register, unitLabel, step } = props;
  return (
    <S.Container>
      <BasicTextField required type={type} label={label} register={register} step={step} />
      <BasicUnit label={unitLabel} />
    </S.Container>
  );
}
