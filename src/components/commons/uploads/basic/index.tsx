import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BasicModal from "../../modal/basic";
import FilePreview from "./filePreview";

import { useEffect, useRef, useState } from "react";
import { checkValidationImg } from "@/src/commons/libraries/validation";
import type { ChangeEvent, RefObject } from "react";
import type { IFiles, IBasicUploadProps } from "./types";

export default function BasicUpload(props: IBasicUploadProps): JSX.Element {
  const [files, setFiles] = useState<IFiles[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
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
      const selectedFiles = Array.from(e.target.files);
      const totalFilesCount = files.length + selectedFiles.length;

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
      const validFilePreviews = fileWithPreviews.filter((fileWithPreview) => fileWithPreview !== null);
      const updatedFilePreviews = [...files, ...validFilePreviews];

      setFiles(updatedFilePreviews);
      props.onFilesChange(updatedFilePreviews.map((fileWithPreview) => fileWithPreview.file));
    }
  };

  const onRemoveFile = (index: number): void => {
    const updatedFilePreviews = files.filter((_, i) => i !== index);
    console.log("updatedFilePreviews: ", updatedFilePreviews);
    setFiles(updatedFilePreviews);
    props.onFilesChange(updatedFilePreviews.map((fileWithPreview) => fileWithPreview.file));
    // 리셋 파일 입력 필드
    resetFileInput(fileInputRef);
  };
  // const [filePreviews, setFiles] = useState<IFileWithPreview[]>([]);
  // const [fileImages, setFileImages] = useState<string[]>([]);
  // const fileInputRef = useRef<HTMLInputElement | null>(null);
  console.log("filePreviews: ", files);
  console.log("fileImages: ", fileUrls);
  console.log("fileInputRef: ", fileInputRef);

  // const onRemoveFile = (index: number, type: "existing" | "new"): void => {
  //   if (type === "existing") {
  //     // console.log(props.docData?.imageUrls);
  //     // 기존 이미지 삭제 로직:
  //     const updatedImages = props.docData?.imageUrls?.filter((_, i) => i !== index) ?? [];
  //     console.log(updatedImages);
  //     setFileImages(updatedImages);
  //   } else if (type === "new") {
  //     // 새로 추가된 이미지 삭제 로직: 로컬 상태에서 제거
  //     const updatedFilePreviews = filePreviews.filter((_, i) => i !== index);
  //     console.log(updatedFilePreviews);
  //     // 상태 업데이트 함수 호출
  //     setFiles(updatedFilePreviews);
  //   }
  // };

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
      <FilePreview fileUrls={fileUrls} files={files} onRemoveFile={onRemoveFile} />
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
