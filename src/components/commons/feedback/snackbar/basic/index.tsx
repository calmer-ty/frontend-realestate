import { Snackbar } from "@mui/material";
import type { IBasicSnackbar } from "./types";

export default function BasicSnackbar(props: IBasicSnackbar): JSX.Element {
  return (
    <Snackbar open={props.open} onClose={props.close} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      {props.children}
    </Snackbar>
  );
}
