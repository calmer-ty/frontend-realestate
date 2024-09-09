import UnderlineTitle from "@/src/components/commons/titles/underline";
import TextFieldBasic from "@/src/components/commons/inputs/textField/basic";
import BasicUnit from "@/src/components/commons/units/basic";
import ControlRadio from "@/src/components/commons/inputs/radio/control";
import type { IAddInfoProps } from "./types";

export default function AddInfo(props: IAddInfoProps): JSX.Element {
  const { register, control } = props;

  return (
    <section>
      <UnderlineTitle label="추가 정보" />
      <div className="inputUnit">
        <TextFieldBasic required role="input-addressDetail" type="number" label="층" register={register("floor")} />
        <BasicUnit label="층" />
      </div>
      <div className="inputUnit">
        <TextFieldBasic required role="input-bathroom" type="number" label="욕실 수" register={register("bathroomCount")} />
        <BasicUnit label="개" />
      </div>
      <ControlRadio label="엘리베이터" selectLabel1="없음" selectLabel2="있음" name="elevator" control={control} />
    </section>
  );
}
