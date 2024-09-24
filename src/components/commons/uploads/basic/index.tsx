import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BasicModal from "../../modal/basic";
import FilePreview from "./filePreview";

import { useEffect, useRef, useState } from "react";
import { checkValidationImg } from "@/src/commons/libraries/validation";
import type { ChangeEvent, RefObject } from "react";
import type { IFiles, IBasicUploadProps } from "./types";

export default function BasicUpload(props: IBasicUploadProps): JSX.Element {
  const [pendingFiles, setFiles] = useState<IFiles[]>([]);
  const [uploadedImageUrls, setFileUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // 이미지 데이터 값을 리딩
  useEffect(() => {
    if (props.docData?.imageUrls !== undefined) {
      setFileUrls(props.docData.imageUrls);
    }
  }, [props.docData?.imageUrls]);

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

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files !== null) {
      const targetFiles = Array.from(e.target.files);
      const totalFilesCount = pendingFiles.length + targetFiles.length;

      if (totalFilesCount > 5) {
        setModalMessage("이미지는 5개까지 업로드가 가능합니다.");
        setOpenModal(true);
        // 리셋 파일 입력 필드
        resetFileInput(fileInputRef);
        return;
      }

      const fileWithPreviews = await Promise.all(
        targetFiles.map(async (file) => {
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
      const validFiles = fileWithPreviews.filter((fileWithPreview) => fileWithPreview !== null);
      const updatedFilePreviews = [...pendingFiles, ...validFiles];

      setFiles(updatedFilePreviews);
      props.onFilesChange(updatedFilePreviews.map((fileWithPreview) => fileWithPreview.file));
    }
  };

  // 기존 일회성
  // const onRemoveFile = (index: number): void => {
  //   const updatedFilePreviews = files.filter((_, i) => i !== index);
  //   console.log("updatedFilePreviews: ", updatedFilePreviews);
  //   setFiles(updatedFilePreviews);
  //   props.onFilesChange(updatedFilePreviews.map((fileWithPreview) => fileWithPreview.file));
  //   // 리셋 파일 입력 필드
  //   resetFileInput(fileInputRef);
  // };

  // const onRemoveFile = (index: number, type: "existed" | "new"): void => {
  //   // 기존 이미지 삭제 로직: 로컬 상태에서 제거
  //   setClickedIndexes((prev) => {
  //     const updatedIndexes = Array.from(new Set([...prev, index]));
  //     return updatedIndexes;
  //   });
  //   if (type === "existed") {
  //     console.log("clickedIndexes: ", clickedIndexes);
  //   } else if (type === "new") {
  //     // 새로 추가된 이미지 삭제 로직: 로컬 상태에서 제거
  //     const updatedFilePreviews = files.filter((_, i) => i !== index);
  //     setFiles(updatedFilePreviews);
  //   }
  // };

  const [, setClickedIndexes] = useState<number[]>([]);
  const onRemoveFile = (index: number): void => {
    setClickedIndexes((prev) => {
      const updatedIndexes = Array.from(new Set([...prev, index])); // 중복 제거
      return updatedIndexes;
    });

    // URL 제거 로직 추가
    const updatedUrls = uploadedImageUrls.filter((_, i) => i !== index);
    setFileUrls(updatedUrls);
    console.log("Updated Urls: ", updatedUrls); // 상태 확인

    // 파일 제거 로직 추가
    const updatedFiles = pendingFiles.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    console.log("Updated files: ", updatedFiles); // 상태 확인
  };

  return (
    <>
      <Button
        sx={{ width: "160px" }}
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        사진 추가
      </Button>
      <input type="file" multiple ref={fileInputRef} onChange={onFileChange} style={{ display: "none" }} />
      <FilePreview fileUrls={uploadedImageUrls} files={pendingFiles} onRemoveFile={onRemoveFile} />
      {openModal && (
        <BasicModal
          open={openModal}
          onToggle={() => {
            setOpenModal(false);
          }}
        >
          <p>{modalMessage}</p>
        </BasicModal>
      )}
    </>
  );
}
