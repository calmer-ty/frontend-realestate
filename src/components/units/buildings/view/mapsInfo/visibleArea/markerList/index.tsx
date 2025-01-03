import ListItem from "./listItem";
import type { IMarkerListProps } from "./types";

export default function MarkerList({ visibleMarkerData, firestoreData, onClickInfo }: IMarkerListProps): JSX.Element {
  return (
    <ul>
      {visibleMarkerData.map((el, index) => (
        <ListItem key={`${el.data?.aptNm}_${index}`} el={el} index={index} firestoreData={firestoreData} onClickInfo={onClickInfo} />
      ))}
    </ul>
  );
}
