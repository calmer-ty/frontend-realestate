import { useMapsLoader } from "@/src/hooks/maps/useMapsLoader";

import RegionSelect from "../ui/regionSelect";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";
import MapMode from "../ui/mapMode";

import * as S from "./styles";
import type { Dispatch, SetStateAction } from "react";
import type { IAssetForm } from "@/src/commons/types";
interface INaverMapsProps {
  mapMode: boolean;
  setMapMode: Dispatch<SetStateAction<boolean>>;
  setAsset: Dispatch<SetStateAction<IAssetForm | undefined>>;
  // mapLoading: boolean;
  onMapLoaded: (map: any) => void;
  allGeocodeDataLoading: boolean;
  setRegionName: Dispatch<SetStateAction<string | undefined>>;
  setRegionCode: Dispatch<SetStateAction<string | undefined>>;
}

export default function NaverMaps({ mapMode, setMapMode, setAsset, onMapLoaded, setRegionCode, setRegionName, allGeocodeDataLoading }: INaverMapsProps): JSX.Element {
  const { mapLoading } = useMapsLoader({ onMapLoaded });
  console.log("mapLoading: ", mapLoading);
  return (
    <S.Container>
      {mapLoading === true ? (
        <LoadingSpinner size={100} />
      ) : (
        <>
          <div id="map"></div>
          <MapMode mapMode={mapMode} setMapMode={setMapMode} setAsset={setAsset} />
          {allGeocodeDataLoading && <LoadingSpinner size={100} />}
          {mapLoading === false && <RegionSelect setRegionName={setRegionName} setRegionCode={setRegionCode} />}
        </>
      )}
    </S.Container>
  );
}
