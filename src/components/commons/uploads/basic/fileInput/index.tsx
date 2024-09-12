import { checkValidationImg } from "@/src/commons/libraries/validation";
import { useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import type { ChangeEvent } from "react";
import type { IFileInputProps } from "./types";

export default function FileInput(props: IFileInputProps): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      const totalFilesCount = props.filePreviews.length + selectedFiles.length;

      if (totalFilesCount > 5) {
        props.setModalMessage("이미지는 5개까지 업로드가 가능합니다.");
        props.setOpenModal(true);
        // 리셋 파일 입력 필드
        props.resetFileInput(fileInputRef);
        return;
      }

      const fileWithPreviews = await Promise.all(
        selectedFiles.map(async (file) => {
          const isValid = await checkValidationImg(file, props.setModalMessage, props.setOpenModal);
          if (!isValid) {
            // 리셋 파일 입력 필드
            props.resetFileInput(fileInputRef);
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
      const validFilePreviews = fileWithPreviews.filter((fileWithPreview) => fileWithPreview !== null);
      const updatedFilePreviews = [...props.filePreviews, ...validFilePreviews];

      props.setFilePreviews(updatedFilePreviews);
      props.onFilesChange(updatedFilePreviews.map((fileWithPreview) => fileWithPreview.file));
    }
  };

  const triggerFileInput = (): void => {
    if (fileInputRef.current !== null) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Button sx={{ width: "160px" }} variant="outlined" startIcon={<AddIcon />} onClick={triggerFileInput}>
        사진 추가
      </Button>
      <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
    </>
  );
}
