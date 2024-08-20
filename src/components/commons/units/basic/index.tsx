import type { IUnitBasicProps } from "./types";
import * as S from "./styles";

export default function UnitBasic(props: IUnitBasicProps): JSX.Element {
  return <S.Unit>{props.label}</S.Unit>;
}
