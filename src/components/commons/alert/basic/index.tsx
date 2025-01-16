import { Alert, Snackbar } from "@mui/material";

import type { AlertColor } from "@mui/material";
interface IBasicAlert {
  open: boolean;
  close: () => void;
  text: string;
  severity: AlertColor;
}

export default function BasicAlert(props: IBasicAlert): JSX.Element {
  return (
    <Snackbar open={props.open} onClose={props.close} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Alert onClose={props.close} severity={props.severity}>
        {props.text}
      </Alert>
    </Snackbar>
  );
}
