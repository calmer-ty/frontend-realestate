import type { ReactNode } from "react";

export interface BasicModalProps {
  btnText: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}
