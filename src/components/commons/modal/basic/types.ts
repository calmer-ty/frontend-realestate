import type { ReactNode } from "react";

export interface IModalBasicProps {
  children: ReactNode;
  open: boolean;
  btnText?: string;
  onToggle: () => void;
}
