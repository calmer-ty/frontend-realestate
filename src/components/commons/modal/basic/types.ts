import type { ReactNode } from "react";

export interface IModalBasicProps {
  open: boolean;
  children: ReactNode;
  btnText: string;
  onToggle: () => void;
}
