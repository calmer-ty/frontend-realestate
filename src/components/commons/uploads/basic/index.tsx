import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilePreview from "./filePreview";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, RefObject } from "react";
import type { IFiles, IBasicUploadProps } from "./types";

export default function BasicUpload(props: IBasicUploadProps): JSX.Element {
  const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]); // 업로드된 파일 url
  const [pendingFiles, setPendingFiles] = useState<IFiles[]>([]); // 업로드할 파일
  const [, setClickedIndexes] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 이미지 데이터 값을 리딩
  useEffect(() => {
    if (props.docData?.imageUrls !== undefined) {
      setUploadedFileUrls(props.docData.imageUrls);
    }
  }, [props.docData?.imageUrls]);

  const resetFileInput = (inputRef: RefObject<HTMLInputElement>): void => {
    if (inputRef.current !== null) {
      inputRef.current.value = ""; // 파일 입력 필드 리셋
    }
  };

  // 파일리더가 이미지를 읽기 위해 사용하는 함수
  const readFileAsURL = (file: File): Promise<string> => {
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

  // 이미지 파일을 업데이트하는 기능
  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files !== null) {
      const targetFiles = Array.from(e.target.files);
      // const totalFilesCount = pendingFiles.length + targetFiles.length;

      // if (totalFilesCount > 5) {
      //   setModalMessage("이미지는 5개까지 업로드가 가능합니다.");
      //   setOpenModal(true);
      //   // 리셋 파일 입력 필드
      //   resetFileInput(fileInputRef);
      //   return;
      // }

      // 여러 파일이 올라가기에 all로 해준다
      const fileWithFileUrls = await Promise.all(
        targetFiles.map(async (file) => {
          //   const isValid = await checkValidationImg(file, setModalMessage, setOpenModal);
          //  if (!isValid) {
          //     // 리셋 파일 입력 필드
          //     resetFileInput(fileInputRef);
          //     return null; // 유효하지 않은 파일은 null로 처리
          //   }

          try {
            const fileUrl = await readFileAsURL(file);
            return {
              file,
              fileUrl,
            };
          } catch (error) {
            console.error("Error reading file:", error);
            return null;
          }
        })
      );

      // 새로운 파일과 기존 파일을 합쳐서 상태 업데이트
      const updatedFiles = [...pendingFiles, ...fileWithFileUrls];
      const validFiles = updatedFiles.filter((file) => file !== null);

      setPendingFiles(validFiles);
      props.setSelectedFiles(validFiles.map((validFile) => validFile.file));
    }
  };

  // 기존 일회성
  // const onRemoveFile = (index: number): void => {
  //   const updatedFiles = pendingFiles.filter((_, i) => i !== index);
  //   console.log("updatedFiles: ", updatedFiles);
  //   setPendingFiles(updatedFiles);
  //   props.setSelectedFiles(updatedFiles.map((updatedFile) => updatedFile.file));
  //   // 리셋 파일 입력 필드
  //   resetFileInput(fileInputRef);
  // };
  const onRemoveFile = (index: number, type: "url" | "file"): void => {
    setClickedIndexes((prev) => {
      const updatedIndexes = Array.from(new Set([...prev, index])); // 중복 제거
      return updatedIndexes;
    });
    if (type === "url") {
      // firestore 이미지 preview url 로직 추가
      const updatedFileUrls = uploadedFileUrls.filter((_, i) => i !== index);
      setUploadedFileUrls(updatedFileUrls);
      props.setuploadedFileUrls(updatedFileUrls.map((updatedFileUrl) => updatedFileUrl));
      // console.log("Updated Urls: ", updatedUrls); // 상태 확인
    } else if (type === "file") {
      // 새로 추가하는 이미지 preview 로직 추가
      const updatedFiles = pendingFiles.filter((_, i) => i !== index);
      setPendingFiles(updatedFiles);
      // setSelectedFiles을 업데이트 해주어야 지울떄도 업로드 목록에서 사라짐
      props.setSelectedFiles(updatedFiles.map((updatedFile) => updatedFile.file));
      resetFileInput(fileInputRef);
      // console.log("Updated files: ", updatedFiles); // 상태 확인
    }
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
      <input type="file" multiple ref={fileInputRef} onChange={onChangeFile} style={{ display: "none" }} />
      <FilePreview fileUrls={uploadedFileUrls} files={pendingFiles} onRemoveFile={onRemoveFile} />
    </>
  );
}
