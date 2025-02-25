import BuildingInfo from "../ui/buildingInfo";

import type { Dispatch, SetStateAction } from "react";
import type { IAssetForm, IFirestore, IGeocodeData } from "@/src/commons/types";
import BuyCheck from "../ui/buyCheck";
interface ISelectedAreaProps {
  selectedMarkerData: IGeocodeData;
  setSelectedMarkerData: Dispatch<SetStateAction<IGeocodeData | undefined>>;
  matchingData: IFirestore[];
  buildingType: string;
  mapMode: boolean;
  asset: IAssetForm | undefined;
}

export default function SelectedArea({ selectedMarkerData, setSelectedMarkerData, asset, ...restProps }: ISelectedAreaProps): JSX.Element {
  return (
    <>
      <BuildingInfo selectedData={selectedMarkerData} setSelectedData={setSelectedMarkerData} {...restProps} />
      {restProps.mapMode && <BuyCheck selectedData={selectedMarkerData} asset={asset} />}
    </>
  );
}
