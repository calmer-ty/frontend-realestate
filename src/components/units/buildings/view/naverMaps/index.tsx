import RegionSelect from "../select";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import * as S from "./styles";

import type { IGeocodeData } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";
interface INaverMapsProps {
  geocodeData?: IGeocodeData[];
  mapLoading: boolean;
  setRegionName: Dispatch<SetStateAction<string | undefined>>;
  setRegionCode: Dispatch<SetStateAction<string | undefined>>;
}

export default function NaverMaps(props: INaverMapsProps): JSX.Element {
  const { mapLoading, setRegionCode, setRegionName, geocodeData } = props;
  console.log("geocodeData: ", geocodeData);
  return (
    <S.Container>
      {mapLoading ? (
        <LoadingSpinner size={100} />
      ) : (
        <S.Maps id="map">
          <RegionSelect setRegionName={setRegionName} setRegionCode={setRegionCode} />
          {geocodeData?.length === 0 ? <LoadingSpinner size={100} /> : <></>}
        </S.Maps>
      )}
    </S.Container>
  );
}
