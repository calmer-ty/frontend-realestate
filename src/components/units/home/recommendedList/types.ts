import type { IFirestore } from "@/src/commons/types";

export interface IRecommendedListProps {
  firestoreDatas: IFirestore[];
}
export interface IRecommendedListItemProps {
  el: IFirestore;
}
