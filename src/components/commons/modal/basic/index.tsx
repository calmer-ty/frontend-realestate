import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { modalStyle } from "./styles";
import type { BasicModalProps } from "./types";

export default function BasicModal(props: BasicModalProps): JSX.Element {
  return (
    <>
      <Button variant="contained" onClick={props.onToggle}>
        {props.btnText}
      </Button>
      <Modal open={props.open} onClose={props.onToggle} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <CloseIcon style={modalStyle.btn} onClick={props.onToggle} />
          {props.children}
        </Box>
      </Modal>
    </>
  );
}
