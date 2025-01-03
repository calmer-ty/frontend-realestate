import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import * as S from "./styles";

export default function NoData(): JSX.Element {
  return (
    <S.Container>
      <ErrorOutlineIcon fontSize="large" />
      <p>
        조건에 맞는 방이 없습니다.
        <br /> 위치를 조정해보세요.
      </p>
    </S.Container>
  );
}
