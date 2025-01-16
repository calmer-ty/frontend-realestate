import { ClipLoader } from "react-spinners";

import * as S from "./styles";
interface ILoadingSpinnerProps {
  size: number;
}

export default function LoadingSpinner(props: ILoadingSpinnerProps): JSX.Element {
  return (
    <S.Wrap>
      <ClipLoader size={props.size} color={"#123abc"} loading={true} />
    </S.Wrap>
  );
}
