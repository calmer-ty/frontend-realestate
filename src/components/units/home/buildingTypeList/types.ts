import type { ReactNode } from "react";

export interface IBuildingTypeListProps {
  href?: string;
  desc: string;
  icon: ReactNode;
  title: string;
}
export interface IBuildingTypeListItemProps {
  href?: string;
  desc: string;
  icon: ReactNode;
  title: string;
  isDisabled: boolean;
}
export interface IBuildingTypeProps {
  isDisabled: boolean;
}
