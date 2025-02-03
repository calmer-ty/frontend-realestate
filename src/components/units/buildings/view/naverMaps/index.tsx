import RegionSelect from "../ui/regionSelect";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import * as S from "./styles";

import type { Dispatch, SetStateAction } from "react";
interface INaverMapsProps {
  mapLoading: boolean;
  dataLoading: boolean;
  setRegionName: Dispatch<SetStateAction<string | null>>;
  setRegionCode: Dispatch<SetStateAction<string | null>>;
}

export default function NaverMaps(props: INaverMapsProps): JSX.Element {
  const { mapLoading, setRegionCode, setRegionName, dataLoading } = props;

  return (
    <S.Container>
      {mapLoading ? (
        <LoadingSpinner size={100} />
      ) : (
        <>
          <div id="map"></div>
          {dataLoading && <LoadingSpinner size={100} />}
          <RegionSelect setRegionName={setRegionName} setRegionCode={setRegionCode} />
        </>
      )}
    </S.Container>
  );
}
