import { useRef, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import ModalBasic from "../../modal/basic";

import { checkValidationImg } from "@/src/commons/libraries/validation";

import type { ChangeEvent, RefObject } from "react";
import type { IFileWithPreview, IUploadBasicProps } from "./types";
import * as S from "./styles";

export default function UploadBasic({ onFilesChange }: IUploadBasicProps): JSX.Element {
  const [filePreviews, setFilePreviews] = useState<IFileWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const resetFileInput = (inputRef: RefObject<HTMLInputElement>): void => {
    if (inputRef.current !== null) {
      inputRef.current.value = ""; // 파일 입력 필드 리셋
    }
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read file."));
        }
      };
      reader.onerror = () => {
        reject(new Error("File reading error."));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files !== null) {
      const selectedFiles = Array.from(e.target.files);
      const totalFilesCount = filePreviews.length + selectedFiles.length;

      if (totalFilesCount > 5) {
        setModalMessage("이미지는 5개까지 업로드가 가능합니다.");
        setOpenModal(true);
        // 리셋 파일 입력 필드
        resetFileInput(fileInputRef);
        return;
      }

      const fileWithPreviews = await Promise.all(
        selectedFiles.map(async (file) => {
          const isValid = await checkValidationImg(file, setModalMessage, setOpenModal);
          if (!isValid) {
            // 리셋 파일 입력 필드
            resetFileInput(fileInputRef);
            return null; // 유효하지 않은 파일은 null로 처리
          }

          try {
            const previewUrl = await readFileAsDataURL(file);
            return {
              file,
              previewUrl,
            };
          } catch (error) {
            console.error("Error reading file:", error);
            return null;
          }
        })
      );

      // 새로운 파일과 기존 파일을 합쳐서 상태 업데이트
      const validFilePreviews = fileWithPreviews.filter((fileWithPreview): fileWithPreview is IFileWithPreview => fileWithPreview !== null);
      const updatedFilePreviews = [...filePreviews, ...validFilePreviews];

      setFilePreviews(updatedFilePreviews);
      onFilesChange(updatedFilePreviews.map((fileWithPreview) => fileWithPreview.file));
    }
  };

  const triggerFileInput = (): void => {
    if (fileInputRef.current !== null) {
      fileInputRef.current.click();
    }
  };
  return (
    <>
      <S.UploadBtn variant="outlined" startIcon={<AddIcon />} onClick={triggerFileInput}>
        사진 추가
      </S.UploadBtn>
      <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
      <div>
        <S.FilePreview>
          {filePreviews.map((fileWithPreview, index) => (
            <S.PrevWrap key={index} style={{ position: "relative" }}>
              <S.PrevImg src={fileWithPreview.previewUrl} width={0} height={0} alt={`Preview ${index}`} />
            </S.PrevWrap>
          ))}
        </S.FilePreview>
      </div>

      {openModal && (
        <ModalBasic
          open={openModal}
          onToggle={() => {
            setOpenModal(false);
          }}
        >
          <p>{modalMessage}</p>
        </ModalBasic>
      )}
    </>
  );
}
