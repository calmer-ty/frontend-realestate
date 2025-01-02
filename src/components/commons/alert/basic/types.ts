import type { AlertColor } from "@mui/material";

export interface IBasicAlert {
  open: boolean;
  close: () => void;
  text: string;
  severity: AlertColor;
}
