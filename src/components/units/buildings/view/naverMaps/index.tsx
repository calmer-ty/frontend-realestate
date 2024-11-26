/** @jsxImportSource @emotion/react */
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import type { INaverMapsProps } from "./types";
import { containerStyle } from "./styles";

export default function NaverMaps(props: INaverMapsProps): JSX.Element {
  return (
    <div id="map" css={containerStyle}>
      {props.geocodeResults?.length === 0 && <LoadingSpinner size={100} />}
    </div>
  );
}
