import RegionSelect from "../ui/regionSelect";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import * as S from "./styles";

import type { Dispatch, SetStateAction } from "react";
interface INaverMapsProps {
  mapLoading: boolean;
  dataLoading: boolean;
  setRegionName: Dispatch<SetStateAction<string | undefined>>;
  setRegionCode: Dispatch<SetStateAction<string | undefined>>;
}

export default function NaverMaps({ mapLoading, setRegionCode, setRegionName, dataLoading }: INaverMapsProps): JSX.Element {
  return (
    <S.Container>
      {mapLoading ? (
        <LoadingSpinner size={100} />
      ) : (
        <>
          <div id="map"></div>
          {dataLoading && <LoadingSpinner size={100} />}
          {!mapLoading && <RegionSelect setRegionName={setRegionName} setRegionCode={setRegionCode} />}
        </>
      )}
    </S.Container>
  );
}
