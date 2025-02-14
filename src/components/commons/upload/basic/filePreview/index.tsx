import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";

import * as S from "./styles";

import type { IFiles } from "../types";
interface IFilePreviewProps {
  imageUrls: string[];
  pendingFiles: IFiles[];
  onRemoveFile: (index: number, type: "url" | "file") => void;
}

export default function FilePreviewList({ imageUrls, onRemoveFile, pendingFiles }: IFilePreviewProps): JSX.Element {
  return (
    <S.FilePreview>
      {/* 기존의 등록된 이미지 Url */}
      {imageUrls.map((el, index) => (
        <S.PrevWrap key={`${el}-${index}`}>
          <Image src={el} alt={`Preview ${index}`} fill style={{ objectFit: "cover" }} unoptimized />

          <S.PrevCloseBtn
            type="button"
            onClick={() => {
              onRemoveFile(index, "url");
            }}
          >
            <CloseIcon />
          </S.PrevCloseBtn>
        </S.PrevWrap>
      ))}
      {/* 새로 추가되는 이미지 파일 */}
      {pendingFiles.map((el, index) => (
        <S.PrevWrap key={`${el.fileUrl}-${index}`}>
          <Image src={el.fileUrl} alt={`Preview ${index}`} fill style={{ objectFit: "cover" }} unoptimized />
          <S.PrevCloseBtn
            type="button"
            onClick={() => {
              onRemoveFile(index, "file");
            }}
          >
            <CloseIcon />
          </S.PrevCloseBtn>
        </S.PrevWrap>
      ))}
    </S.FilePreview>
  );
}
