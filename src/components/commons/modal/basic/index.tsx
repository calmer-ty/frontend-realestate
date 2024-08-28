import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import type { IModalBasicProps } from "./types";
import { modalStyle, submitBtnStyle } from "./styles";

export default function ModalBasic(props: IModalBasicProps): JSX.Element {
  return (
    <>
      {props.btnText !== undefined ? (
        <Button style={submitBtnStyle} variant="outlined" onClick={props.onToggle}>
          {props.btnText}
        </Button>
      ) : (
        <></>
      )}
      <Modal open={props.open} onClose={props.onToggle} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <CloseIcon style={modalStyle.closeBtn} onClick={props.onToggle} />
          {props.children}
        </Box>
      </Modal>
    </>
  );
}
