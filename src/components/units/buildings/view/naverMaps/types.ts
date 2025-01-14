import type { IGeocodeData } from "@/src/commons/types";

export interface INaverMapsProps {
  geocodeData?: IGeocodeData[];
  loading: boolean;
}
