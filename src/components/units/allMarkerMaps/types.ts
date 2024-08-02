import type { IGeocodeEtcData } from "@/src/commons/types";

export interface IAllMarkerMapsProps {
  buildingType: string;
  geocodeResults: IGeocodeEtcData[];
}
