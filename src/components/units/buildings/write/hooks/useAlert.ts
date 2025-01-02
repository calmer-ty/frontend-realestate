import { useState } from "react";

import type { Dispatch, SetStateAction } from "react";
import type { AlertColor } from "@mui/material";

interface IUseAlertReturn {
  alertOpen: boolean;
  alertText: string;
  alertSeverity: AlertColor;
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
  setAlertText: Dispatch<SetStateAction<string>>;
  setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
  alertClose: () => void;
}

export const useAlert = (): IUseAlertReturn => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("info");

  const alertClose = (): void => {
    setAlertOpen(false);
  };

  return {
    alertOpen,
    alertText,
    alertSeverity,
    setAlertOpen,
    setAlertText,
    setAlertSeverity,
    alertClose,
  };
};
