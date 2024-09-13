import CloseIcon from "@mui/icons-material/Close";
import type { IFilePreviewListProps } from "./types";
import * as S from "./styles";

export default function FilePreviewList(props: IFilePreviewListProps): JSX.Element {
  const { filePreviews, onRemoveFile } = props;
  return (
    <S.FilePreview>
      {filePreviews.map((fileWithPreview, index) => (
        <S.PrevWrap key={index}>
          <S.PrevImg src={fileWithPreview.previewUrl} width={0} height={0} alt={`Preview ${index}`} />
          <S.PrevCloseBtn
            type="button"
            onClick={() => {
              onRemoveFile(index);
            }}
          >
            <CloseIcon />
          </S.PrevCloseBtn>
        </S.PrevWrap>
      ))}
    </S.FilePreview>
  );
}
