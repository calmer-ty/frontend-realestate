import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import type { INoDataMessageProps } from "./types";
import * as S from "./styles";

export default function NoDataMessage(props: INoDataMessageProps): JSX.Element {
  return (
    <S.Container>
      <ErrorOutlineIcon fontSize="large" />
      <p>{props.text}</p>
    </S.Container>
  );
}
