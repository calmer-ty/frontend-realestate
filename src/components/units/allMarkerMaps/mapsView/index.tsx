import type { IMapViewProps } from "./types";
import { containerStyle, imgStyle } from "./styles";
import Image from "next/image";

export default function MapView(props: IMapViewProps): JSX.Element {
  return (
    <div id="map" style={containerStyle}>
      {props.geocodeResults.length === 0 && <Image alt="loading" src="/images/load.gif" width={60} height={60} style={imgStyle} />}
    </div>
  );
}
