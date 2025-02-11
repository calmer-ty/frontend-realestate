import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

import * as S from "./styles";

import type { ReactNode } from "react";
interface IBasicModalProps {
  children: ReactNode;
  open: boolean;
  onToggle: () => void;
}

export default function BasicModal({ children, open, onToggle }: IBasicModalProps): JSX.Element {
  return (
    <Modal open={open} onClose={onToggle}>
      <S.Box>
        <CloseIcon onClick={onToggle} />
        {children}
      </S.Box>
    </Modal>
  );
}
