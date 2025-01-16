import UnderlineTitle from "@/src/components/commons/titles/underline";
import BasicTextField from "@/src/components/commons/inputs/textField/basic";
import BasicUnit from "@/src/components/commons/units/basic";
import ControlRadio from "@/src/components/commons/inputs/radio/control";

import type { Control, UseFormRegister } from "react-hook-form";
import type { IWriteForm } from "@/src/commons/types";
interface IAddInfoProps {
  register: UseFormRegister<IWriteForm>;
  control: Control<IWriteForm, any>;
}

export default function AddInfo(props: IAddInfoProps): JSX.Element {
  return (
    <section>
      <UnderlineTitle label="추가 정보" />
      <div className="inputUnit">
        <BasicTextField required type="number" label="층" register={props.register("floor")} />
        <BasicUnit label="층" />
      </div>
      <div className="inputUnit">
        <BasicTextField required type="number" label="욕실 수" register={props.register("bathroomCount")} />
        <BasicUnit label="개" />
      </div>
      <ControlRadio label="엘리베이터" name="elevator" selectLabel1={"없음"} selectLabel2={"있음"} control={props.control} />
    </section>
  );
}
