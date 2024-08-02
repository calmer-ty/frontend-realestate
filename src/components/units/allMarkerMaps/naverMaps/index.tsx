/** @jsxImportSource @emotion/react */
import { containerStyle } from "./styles";
import type { INaverMapsProps } from "./types";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

export default function NaverMaps(props: INaverMapsProps): JSX.Element {
  return (
    <div id="map" css={containerStyle}>
      {props.geocodeResults.length === 0 && <LoadingSpinner />}
    </div>
  );
}
