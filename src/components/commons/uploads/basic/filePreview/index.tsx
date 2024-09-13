import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import type { IFilePreviewListProps } from "./types";
import * as S from "./styles";

export default function FilePreviewList(props: IFilePreviewListProps): JSX.Element {
  // console.log("props.docData?.imageUrls:", props.docData?.imageUrls);
  // console.log("props.filePreviews", props.filePreviews);
  return (
    <S.FilePreview>
      {/* {props.docData?.imageUrls.map((imageUrl, index) => (
        <S.PrevWrap key={index}>
          <Image src={imageUrl} width={200} height={150} alt={`Preview ${index}`} style={{ objectFit: "cover" }} />
          <S.PrevCloseBtn
            type="button"
            onClick={() => {
              props.onRemoveFile(index);
            }}
          >
            <CloseIcon />
          </S.PrevCloseBtn>
        </S.PrevWrap>
      ))} */}
      {props.filePreviews.map((fileWithPreview, index) => (
        <S.PrevWrap key={index}>
          <Image src={fileWithPreview.previewUrl} width={200} height={150} alt={`Preview ${index}`} style={{ objectFit: "cover" }} />
          <S.PrevCloseBtn
            type="button"
            onClick={() => {
              props.onRemoveFile(index);
            }}
          >
            <CloseIcon />
          </S.PrevCloseBtn>
        </S.PrevWrap>
      ))}
    </S.FilePreview>
  );
}
