import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import type { INaverMapsProps } from "./types";
import * as S from "./styles";

export default function NaverMaps(props: INaverMapsProps): JSX.Element {
  return (
    <S.Maps id="map">
      <LoadingSpinner size={100} />
    </S.Maps>
  );
}
