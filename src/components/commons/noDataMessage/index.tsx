import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import * as S from "./styles";

interface INoDataMessageProps {
  text: string;
}

export default function NoDataMessage(props: INoDataMessageProps): JSX.Element {
  return (
    <S.Container>
      <ErrorOutlineIcon fontSize="large" />
      <p>{props.text}</p>
    </S.Container>
  );
}
