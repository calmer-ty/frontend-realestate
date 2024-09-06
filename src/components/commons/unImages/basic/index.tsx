import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import type { IBasicUnImageProps } from "./types";
import * as S from "./styles";

export default function BasicUnImage(props: IBasicUnImageProps): JSX.Element {
  return (
    <S.UnImage {...props}>
      <ImageNotSupportedIcon fontSize="inherit" />
    </S.UnImage>
  );
}
