import RegionSelect from "../select";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import * as S from "./styles";

import type { Dispatch, SetStateAction } from "react";
interface INaverMapsProps {
  mapLoading: boolean;
  dataLoading: boolean;
  setRegionName: Dispatch<SetStateAction<string | undefined>>;
  setRegionCode: Dispatch<SetStateAction<string | undefined>>;
}

export default function NaverMaps(props: INaverMapsProps): JSX.Element {
  const { mapLoading, setRegionCode, setRegionName, dataLoading } = props;

  return (
    <S.Container>
      {mapLoading ? (
        <LoadingSpinner size={100} />
      ) : (
        <S.Maps id="map">
          <RegionSelect setRegionName={setRegionName} setRegionCode={setRegionCode} />
          {dataLoading ? <LoadingSpinner size={100} /> : <></>}
        </S.Maps>
      )}
    </S.Container>
  );
}
