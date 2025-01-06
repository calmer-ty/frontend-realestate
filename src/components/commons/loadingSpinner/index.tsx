import { ClipLoader } from "react-spinners";

import type { ILoadingSpinnerProps } from "./types";
import * as S from "./styles";

export default function LoadingSpinner(props: ILoadingSpinnerProps): JSX.Element {
  return (
    <S.Wrap>
      <ClipLoader size={props.size} color={"#123abc"} loading={true} />
    </S.Wrap>
  );
}
