import type { IMapViewProps } from "./types";
import { viewStyle } from "./styles";

export default function MapView(props: IMapViewProps): JSX.Element {
  return (
    <div id="map" style={viewStyle.container}>
      <p style={viewStyle.message.loading}>{props.geocodeResults.length === 0 ? "지도 정보를 불러오는 중입니다." : ""}</p>
    </div>
  );
}
