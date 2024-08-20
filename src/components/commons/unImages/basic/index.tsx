import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

import type { IUnImageBasicProps } from "./types";
import * as S from "./styles";

export default function UnImageBasic(props: IUnImageBasicProps): JSX.Element {
  return (
    <S.UnImage {...props}>
      <ImageNotSupportedIcon fontSize="inherit" />
    </S.UnImage>
  );
}
