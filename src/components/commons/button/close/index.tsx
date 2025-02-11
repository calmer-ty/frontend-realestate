import CloseIcon from "@mui/icons-material/Close";

import * as S from "./styles";

interface ICloseButtonProps {
  onClickClose: () => void;
}

export default function CloseButton({ onClickClose }: ICloseButtonProps): JSX.Element {
  return (
    <S.CloseButton onClick={onClickClose}>
      <CloseIcon />
    </S.CloseButton>
  );
}
