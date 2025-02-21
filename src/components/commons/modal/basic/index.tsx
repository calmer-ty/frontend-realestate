import CloseButton from "@/src/components/commons/button/close";

import * as S from "./styles";

import type { ReactNode } from "react";
interface IBasicModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export default function BasicModal({ children, open, onClose }: IBasicModalProps): JSX.Element {
  return (
    <S.StyleModal open={open} onClose={onClose}>
      <div className="inner">
        <CloseButton onClickClose={onClose} />
        {children}
      </div>
    </S.StyleModal>
  );
}
