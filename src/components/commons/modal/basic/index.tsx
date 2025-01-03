import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

import type { IBasicModalProps } from "./types";
import { modalStyle } from "./styles";

export default function BasicModal(props: IBasicModalProps): JSX.Element {
  return (
    <Modal open={props.open} onClose={props.onToggle} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={modalStyle}>
        <CloseIcon style={modalStyle.closeBtn} onClick={props.onToggle} />
        {props.children}
      </Box>
    </Modal>
  );
}
