import type { IBasicUnitProps } from "./types";
import * as S from "./styles";

export default function BasicUnit(props: IBasicUnitProps): JSX.Element {
  return <S.Unit>{props.label}</S.Unit>;
}
