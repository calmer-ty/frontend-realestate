import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import * as S from "./styles";

interface INoDataMessageProps {
  text: string;
}

export default function NoDataMessage({ text }: INoDataMessageProps): JSX.Element {
  return (
    <S.Container>
      <ErrorOutlineIcon fontSize="large" />
      <p>{text}</p>
    </S.Container>
  );
}
