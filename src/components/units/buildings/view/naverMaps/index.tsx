import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import * as S from "./styles";
import type { IGeocodeData } from "@/src/commons/types";
interface INaverMapsProps {
  geocodeData?: IGeocodeData[];
  mapLoading: boolean;
}

export default function NaverMaps(props: INaverMapsProps): JSX.Element {
  return <S.Container>{props.mapLoading ? <LoadingSpinner size={100} /> : <S.Maps id="map"></S.Maps>}</S.Container>;
}
