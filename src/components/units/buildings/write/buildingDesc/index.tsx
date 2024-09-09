import { TextField } from "@mui/material";
import UnderlineTitle from "@/src/components/commons/titles/underline";
import type { IBuildingDescProps } from "./types";

export default function BuildingDesc(props: IBuildingDescProps): JSX.Element {
  const { register } = props;

  return (
    <section>
      <UnderlineTitle label="매물 설명" />
      <TextField id="outlined-multiline-flexible" label="설명 내용" multiline rows={5} {...register("desc")} />
    </section>
  );
}
