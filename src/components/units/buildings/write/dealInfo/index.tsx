import UnderlineTitle from "@/src/components/commons/titles/underline";
import BasicTextField from "@/src/components/commons/inputs/textField/basic";
import BasicUnit from "@/src/components/commons/units/basic";
import type { IDealInfoProps } from "./types";

export default function DealInfo(props: IDealInfoProps): JSX.Element {
  const { register, editData } = props;

  return (
    <section>
      <UnderlineTitle label="거래 정보" />
      <div className="inputUnit">
        <BasicTextField required type="number" label="매매가" isEdit={editData.isEdit} defaultValue={editData.isEdit ? editData.docData?.price : ""} register={register("price")} />
        <BasicUnit label="만원" />
      </div>
      <div className="inputUnit">
        <BasicTextField required type="number" label="관리비" isEdit={editData.isEdit} defaultValue={editData.isEdit ? editData.docData?.manageCost : ""} register={register("manageCost")} />
        <BasicUnit label="만원" />
      </div>
    </section>
  );
}
