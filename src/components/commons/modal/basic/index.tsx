import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import CloseButton from "@/src/components/commons/button/close";

import type { ReactNode } from "react";

export default function BasicModal({ children, open, onClose }: { children: ReactNode; open: boolean; onClose: () => void }): JSX.Element {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: " absolute",
          top: " 50%",
          left: " 50%",
          transform: " translate(-50%, -50%)",
          width: " 20rem",
          backgroundColor: " #fff",
          border: " 0.125rem solid #000",
          padding: " 2.5rem 2rem 2rem",
        }}
      >
        <CloseButton onClickClose={onClose} />
        {children}
      </Box>
    </Modal>
  );
}
