import { useFetchAsset } from "@/src/hooks/useFetchAsset";

import { Button } from "@mui/material";
import RegionSelect from "../ui/regionSelect";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import * as S from "./styles";

import type { Dispatch, SetStateAction } from "react";
interface INaverMapsProps {
  mapLoading: boolean;
  allGeocodeDataLoading: boolean;
  setRegionName: Dispatch<SetStateAction<string | undefined>>;
  setRegionCode: Dispatch<SetStateAction<string | undefined>>;
}

export default function NaverMaps({ mapLoading, setRegionCode, setRegionName, allGeocodeDataLoading }: INaverMapsProps): JSX.Element {
  const { asset } = useFetchAsset();
  console.log("asset: ", asset);
  return (
    <S.Container>
      {mapLoading ? (
        <LoadingSpinner size={100} />
      ) : (
        <>
          <Button>살수있음?</Button>
          <div id="map"></div>
          {allGeocodeDataLoading && <LoadingSpinner size={100} />}
          {!mapLoading && <RegionSelect setRegionName={setRegionName} setRegionCode={setRegionCode} />}
        </>
      )}
    </S.Container>
  );
}
