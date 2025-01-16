import { TextField } from "@mui/material";
import UnderlineTitle from "@/src/components/commons/titles/underline";

import type { UseFormRegister } from "react-hook-form";
import type { IWriteForm } from "@/src/commons/types";
interface IBuildingDescProps {
  register: UseFormRegister<IWriteForm>;
}

export default function BuildingDesc(props: IBuildingDescProps): JSX.Element {
  return (
    <section>
      <UnderlineTitle label="매물 설명" />
      <TextField
        id="outlined-multiline-flexible"
        label="설명 내용"
        multiline
        rows={5}
        InputLabelProps={{
          shrink: true,
        }}
        {...props.register("desc")}
      />
    </section>
  );
}
