/** @jsxImportSource @emotion/react */
import Image from "next/image";
import { containerStyle, imgStyle } from "./styles";
import type { INaverMapsProps } from "./types";

export default function NaverMaps(props: INaverMapsProps): JSX.Element {
  return (
    <div id="map" css={containerStyle}>
      {props.geocodeResults.length === 0 && <Image alt="loading" src="/images/load.gif" width={60} height={60} css={imgStyle} />}
    </div>
  );
}
