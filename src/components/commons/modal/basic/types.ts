import type { ReactNode } from "react";

export interface IBasicModalProps {
  children: ReactNode;
  open: boolean;
  btnText?: string;
  onToggle: () => void;
}
