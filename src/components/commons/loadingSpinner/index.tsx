import { ClipLoader } from "react-spinners";

import * as S from "./styles";
interface ILoadingSpinnerProps {
  size: number;
}

export default function LoadingSpinner({ size }: ILoadingSpinnerProps): JSX.Element {
  return (
    <S.Wrap className="loadingSpinner">
      <ClipLoader size={size} color={"#123abc"} loading={true} />
    </S.Wrap>
  );
}
