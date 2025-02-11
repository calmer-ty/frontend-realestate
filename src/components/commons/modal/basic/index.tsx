import CloseButton from "@/src/components/commons/button/close";

import * as S from "./styles";

import type { ReactNode } from "react";
interface IBasicModalProps {
  children: ReactNode;
  open: boolean;
  onToggle: () => void;
}

export default function BasicModal({ children, open, onToggle }: IBasicModalProps): JSX.Element {
  return (
    <S.StyleModal open={open} onClose={onToggle}>
      <div className="inner">
        <CloseButton onClickClose={onToggle} />
        {children}
      </div>
    </S.StyleModal>
  );
}
