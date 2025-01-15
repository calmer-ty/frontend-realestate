import type { IGeocodeData } from "@/src/commons/types";

export interface INaverMapsProps {
  geocodeData?: IGeocodeData[];
  mapLoading: boolean;
}
