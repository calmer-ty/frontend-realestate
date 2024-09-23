import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import type { IFilePreviewProps } from "./types";
import * as S from "./styles";

export default function FilePreviewList(props: IFilePreviewProps): JSX.Element {
  const combinedImages = [...(props.fileUrls.map((fileUrl) => ({ url: fileUrl, isExisting: true })) ?? []), ...props.files.map((file) => ({ url: file.previewUrl, isExisting: false }))];

  return (
    <S.FilePreview>
      {combinedImages.map((image, index) => (
        <S.PrevWrap key={`new-${index}`}>
          <Image src={image.url} width={200} height={150} alt={`Preview ${index}`} style={{ objectFit: "cover" }} />
          <S.PrevCloseBtn
            type="button"
            onClick={() => {
              // 구분 정보를 참조하여 삭제 처리
              if (image.isExisting) {
                props.onRemoveFile(index, "existing");
              } else {
                props.onRemoveFile(index - (props.fileUrls?.length ?? 0), "new");
              }
            }}
          >
            <CloseIcon />
          </S.PrevCloseBtn>
        </S.PrevWrap>
      ))}
    </S.FilePreview>
  );
}
