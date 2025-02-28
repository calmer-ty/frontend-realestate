import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

export default function CloseButton({ onClickClose }: { onClickClose: () => void }): JSX.Element {
  return (
    <Button sx={{ position: "absolute", top: "0.625rem", right: "0.625rem", padding: "0", minWidth: "1.875rem", cursor: "pointer" }} onClick={onClickClose}>
      <CloseIcon />
    </Button>
  );
}
