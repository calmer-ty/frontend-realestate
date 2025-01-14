import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import type { INaverMapsProps } from "./types";
import * as S from "./styles";

export default function NaverMaps(props: INaverMapsProps): JSX.Element {
  // console.log(props);
  // prettier-ignore
  return (
    <S.Container>
      {/* {props.geocodeData?.length === 0 ? <LoadingSpinner size={100} /> : <S.Maps id="map"></S.Maps>} */}
      {props.loading ? <LoadingSpinner size={100} /> : <S.Maps id="map"></S.Maps>}
    </S.Container>
  );
}
