import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

import * as S from "./styles";

interface IBasicUnImageProps {
  width: string;
  height: string;
  fontSize: string;
}

export default function BasicUnImage(props: IBasicUnImageProps): JSX.Element {
  return (
    <S.UnImage {...props}>
      <ImageNotSupportedIcon fontSize="inherit" />
    </S.UnImage>
  );
}
