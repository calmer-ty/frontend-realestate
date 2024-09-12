import UnderlineTitle from "@/src/components/commons/titles/underline";
import BasicTextField from "@/src/components/commons/inputs/textField/basic";
import BasicUnit from "@/src/components/commons/units/basic";
import ControlRadio from "@/src/components/commons/inputs/radio/control";
import { useEffect } from "react";
import type { IAddInfoProps } from "./types";

export default function AddInfo(props: IAddInfoProps): JSX.Element {
  const { register, setValue, control, docData } = props;

  const elevatorValue = docData?.elevator;
  useEffect(() => {
    if (typeof elevatorValue === "string") {
      setValue("elevator", elevatorValue); // 데이터가 준비되면 값 설정
    }
  }, [elevatorValue, setValue]);

  return (
    <section>
      <UnderlineTitle label="추가 정보" />
      <div className="inputUnit">
        <BasicTextField required type="number" name="floor" label="층" register={register("floor")} />
        <BasicUnit label="층" />
      </div>
      <div className="inputUnit">
        <BasicTextField
          required
          type="number"
          name="bathroomCount"
          label="욕실 수"
          // isEdit={isEdit}
          // defaultValue={editData.isEdit ? editData.docData?.bathroomCount : ""}
          register={register("bathroomCount")}
        />
        <BasicUnit label="개" />
      </div>
      <ControlRadio label="엘리베이터" selectLabel1={"없음"} selectLabel2={"있음"} name="elevator" control={control} />
    </section>
  );
}
