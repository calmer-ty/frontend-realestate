import type { IFirestoreData } from "@/src/commons/types";
import type { ReactNode } from "react";

export interface IBuildingTypeItemProps {
  href?: string;
  description?: string;
  icon: ReactNode;
  title: string;
}
export interface IBuildingTypeProps {
  isDisabled: boolean;
}
export interface IRecommendedListProps {
  firestoreDatas: IFirestoreData[];
}
