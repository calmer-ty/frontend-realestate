/** @jsxImportSource @emotion/react */
import Image from "next/image";
import { containerStyle, imgStyle } from "./styles";
import type { IMapViewProps } from "./types";

export default function MapsView(props: IMapViewProps): JSX.Element {
  return (
    <div id="map" css={containerStyle}>
      {props.geocodeResults.length === 0 && <Image alt="loading" src="/images/load.gif" width={60} height={60} css={imgStyle} />}
    </div>
  );
}
