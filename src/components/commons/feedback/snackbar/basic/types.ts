import type { ReactElement } from "react";

export interface IBasicSnackbar {
  open: boolean;
  close: () => void;
  children: ReactElement;
}
