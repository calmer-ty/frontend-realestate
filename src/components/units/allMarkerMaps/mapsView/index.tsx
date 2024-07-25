import type { IMapViewProps } from "./types";
import { viewStyle } from "./styles";
import Image from "next/image";

export default function MapView(props: IMapViewProps): JSX.Element {
  return (
    <div id="map" style={viewStyle.container}>
      {props.geocodeResults.length === 0 && <Image alt="loading" src="/images/load.gif" width={60} height={60} style={viewStyle.img} />}
    </div>
  );
}
