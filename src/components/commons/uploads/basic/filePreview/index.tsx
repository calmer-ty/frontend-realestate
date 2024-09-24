import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import type { IFilePreviewProps } from "./types";
import * as S from "./styles";

export default function FilePreviewList(props: IFilePreviewProps): JSX.Element {
  return (
    <S.FilePreview>
      {/* 기존의 등록된 이미지 Url */}
      {props.fileUrls.map((el, index) => (
        <S.PrevWrap key={`new-${index}`}>
          <Image src={el} width={200} height={150} alt={`Preview ${index}`} style={{ objectFit: "cover" }} />
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
      {/* 새로 추가되는 이미지 파일 */}
      {props.files.map((el, index) => (
        <S.PrevWrap key={`new-${index}`}>
          <Image src={el.previewUrl} width={200} height={150} alt={`Preview ${index}`} style={{ objectFit: "cover" }} />
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
