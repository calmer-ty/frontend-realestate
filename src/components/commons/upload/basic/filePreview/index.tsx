import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";

import * as S from "./styles";

import type { IFiles } from "../types";
interface IFilePreviewProps {
  pendingFiles: IFiles[];
  imageUrls: string[];
  onRemoveFile: (index: number, type: "url" | "file") => void;
}

export default function FilePreviewList(props: IFilePreviewProps): JSX.Element {
  return (
    <S.FilePreview>
      {/* 기존의 등록된 이미지 Url */}
      {props.imageUrls.map((el, index) => (
        <S.PrevWrap key={`${el}-${index}`}>
          <Image src={el} width={200} height={150} alt={`Preview ${index}`} style={{ objectFit: "cover" }} unoptimized />
          <S.PrevCloseBtn
            type="button"
            onClick={() => {
              props.onRemoveFile(index, "url");
            }}
          >
            <CloseIcon />
          </S.PrevCloseBtn>
        </S.PrevWrap>
      ))}
      {/* 새로 추가되는 이미지 파일 */}
      {props.pendingFiles.map((el, index) => (
        <S.PrevWrap key={`${el.fileUrl}-${index}`}>
          <Image src={el.fileUrl} width={200} height={150} alt={`Preview ${index}`} style={{ objectFit: "cover" }} unoptimized />
          <S.PrevCloseBtn
            type="button"
            onClick={() => {
              props.onRemoveFile(index, "file");
            }}
          >
            <CloseIcon />
          </S.PrevCloseBtn>
        </S.PrevWrap>
      ))}
    </S.FilePreview>
  );
}
