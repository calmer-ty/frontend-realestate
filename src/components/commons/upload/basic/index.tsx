import { useEffect, useRef, useState } from "react";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilePreview from "./filePreview";
import BasicAlert from "../../alert/basic";

import type { Dispatch, SetStateAction, ChangeEvent, RefObject } from "react";
import type { IFiles } from "./types";
import { checkValidationImg } from "@/src/commons/libraries/validation";
import { useAlert } from "@/src/hooks/useAlert";
interface IBasicUploadProps {
  imageUrls: string[] | undefined;
  setSelectedFiles: Dispatch<SetStateAction<File[]>>;
  setUploadedImageUrls: Dispatch<SetStateAction<string[]>>;
}

export default function BasicUpload({ imageUrls, setSelectedFiles, setUploadedImageUrls }: IBasicUploadProps): JSX.Element {
  const [uploadImageUrls, setUploadImageUrls] = useState<string[]>([]); // 업로드된 파일 url
  const [pendingFiles, setPendingFiles] = useState<IFiles[]>([]); // 업로드할 파일
  const [, setClickedIndexes] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 알림창 스테이트
  // const [alertOpen, setAlertOpen] = useState(false);
  // const alertClose = (): void => {
  //   setAlertOpen(false);
  // };
  const { alertOpen, alertText, alertSeverity, alertClose, setAlertOpen, setAlertSeverity, setAlertText } = useAlert();

  // 이미지 데이터 값을 리딩
  useEffect(() => {
    if (imageUrls !== undefined) {
      setUploadImageUrls(imageUrls);
    }
  }, [imageUrls]);

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

  console.log("alertOpen: ", alertOpen);

  // 이미지 파일을 업데이트하는 기능
  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files !== null) {
      const targetFiles = Array.from(e.target.files);

      // 🔹 파일 유효성 검사 (모든 파일 체크)
      const validFiles = [];
      for (const file of targetFiles) {
        const isValid = await checkValidationImg(file);
        if (isValid) {
          validFiles.push(file);
        } else {
          // 유효하지 않은 파일일 경우 알림 띄우기
          setAlertOpen(true);
          setAlertText(`${file.name}은(는) 유효하지 않은 파일입니다.`);
          setAlertSeverity("error");
        }
      }

      if (validFiles.length === 0) return; // 유효한 파일이 하나도 없으면 종료

      // 여러 파일이 올라가기에 all로 해준다
      const fileWithFileUrls = await Promise.all(
        validFiles.map(async (file) => {
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

      const validFileUrls = fileWithFileUrls.filter((file): file is IFiles => file !== null);

      // 새로운 파일과 기존 파일을 합쳐서 상태 업데이트
      const updateFiles = [...pendingFiles, ...validFileUrls];

      if (uploadImageUrls.length + updateFiles.length > 5) {
        setAlertOpen(true);
        resetFileInput(fileInputRef);
        return;
      }

      setPendingFiles(updateFiles);
      setSelectedFiles(updateFiles.map((updateFile) => updateFile.file));
    }
  };

  const onRemoveFile = (index: number, type: "url" | "file"): void => {
    setClickedIndexes((prev) => {
      const updatedIndexes = Array.from(new Set([...prev, index])); // 중복 제거
      return updatedIndexes;
    });
    if (type === "url") {
      // firestore 이미지 preview url 로직 추가
      const updatedFileUrls = uploadImageUrls.filter((_, i) => i !== index);
      setUploadImageUrls(updatedFileUrls);
      setUploadedImageUrls(updatedFileUrls.map((el) => el));
    } else if (type === "file") {
      // 새로 추가하는 이미지 preview 로직 추가
      const updatedFiles = pendingFiles.filter((_, i) => i !== index);
      setPendingFiles(updatedFiles);
      // setSelectedFiles을 업데이트 해주어야 지울떄도 업로드 목록에서 사라짐
      setSelectedFiles(updatedFiles.map((el) => el.file));
      resetFileInput(fileInputRef);
    }
  };

  return (
    <>
      {/* prettier-ignore */}
      <>
        <Button
          sx={{ width: "160px" }}
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => {fileInputRef.current?.click()}}>
          사진 추가
        </Button>
        <input type="file" multiple ref={fileInputRef} onChange={onChangeFile} style={{ display: "none" }} />
      </>
      <FilePreview imageUrls={uploadImageUrls} pendingFiles={pendingFiles} onRemoveFile={onRemoveFile} />

      {/* 알림창 */}
      <BasicAlert open={alertOpen} close={alertClose} severity={alertSeverity} text={alertText} />
    </>
  );
}
