import type { ReactNode } from "react";

export interface IBasicModalProps {
  // btnText?: string;
  children: ReactNode;
  open: boolean;
  onToggle: () => void;
}
