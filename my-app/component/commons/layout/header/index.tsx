import LayoutNavigation from "../navigation";
import * as S from "./styles";

export default function LayoutHeader(): JSX.Element {
  return (
    <S.Header>
      <S.Inner>
        <S.Logo>logo</S.Logo>
        <LayoutNavigation />
      </S.Inner>
    </S.Header>
  );
}
