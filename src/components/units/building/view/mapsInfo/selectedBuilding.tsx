import BuildingInfo from "./ui/buildingInfo";
import BuyCheck from "./ui/buyCheck";

import type { Dispatch, SetStateAction } from "react";
import type { IAssetForm, IFirestore, IGeocodeData } from "@/src/commons/types";
interface ISelectedBuildingProps {
  selectedMarkerData: IGeocodeData;
  setSelectedMarkerData: Dispatch<SetStateAction<IGeocodeData | undefined>>;
  matchingData: IFirestore[];
  buildingType: string;
  mapMode: boolean;
  asset: IAssetForm | undefined;
}

export default function SelectedBuilding({ selectedMarkerData, setSelectedMarkerData, asset, ...restProps }: ISelectedBuildingProps): JSX.Element {
  return (
    <>
      <BuildingInfo selectedData={selectedMarkerData} setSelectedData={setSelectedMarkerData} {...restProps} />
      {restProps.mapMode && <BuyCheck selectedData={selectedMarkerData} asset={asset} />}
    </>
  );
}
