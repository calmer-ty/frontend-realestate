import Image from "next/image";
import { useRef, useState } from "react";
// import { useFirebaseStorage } from "@/src/hooks/useFirebaseStorage";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import type { ChangeEvent } from "react";
import type { IFileWithPreview, IUploadBasicProps } from "./types";
import { FilePreview, imageStyles, inputStyles, PrevWrap } from "./styles";
import { checkValidationImg } from "@/src/commons/libraries/validation";

export default function UploadBasic({ onFilesChange }: IUploadBasicProps): JSX.Element {
  //   const { uploadFiles, uploading } = useFirebaseStorage();
  const [filePreviews, setFilePreviews] = useState<IFileWithPreview[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files !== null) {
      const selectedFiles = Array.from(e.target.files);
      const totalFilesCount = filePreviews.length + selectedFiles.length;

      if (totalFilesCount > 5) {
        alert("You can upload up to 5 files only.");
        return;
      }

      const fileWithPreviews = await Promise.all(
        selectedFiles.map(async (file) => {
          // 파일 검증
          const isValid = await checkValidationImg(file);
          if (!isValid) {
            console.log("검증 실패");
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
          // const reader = new FileReader();
          // return new Promise<IFileWithPreview>((resolve) => {
          //   reader.onloadend = () => {
          //     resolve({
          //       file,
          //       previewUrl: reader.result as string,
          //     });
          //   };
          //   reader.readAsDataURL(file);
          // });
        })
      );

      // 새로운 파일과 기존 파일을 합쳐서 상태 업데이트
      const validFilePreviews = fileWithPreviews.filter((fileWithPreview): fileWithPreview is IFileWithPreview => fileWithPreview !== null);
      const updatedFilePreviews = [...filePreviews, ...validFilePreviews];
      setFilePreviews(updatedFilePreviews);
      onFilesChange(updatedFilePreviews.map((fileWithPreview) => fileWithPreview.file));
    }
  };

  // 파일 업로드 핸들러
  //   const handleUpload = async (): Promise<void> => {
  //     const filesToUpload = filePreviews.map((fileWithPreview) => fileWithPreview.file);
  //     try {
  //       await uploadFiles(filesToUpload);
  //       console.log("Files uploaded successfully");
  //     } catch (error) {
  //       console.error("Upload failed:", error);
  //     }
  //   };

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

  const triggerFileInput = (): void => {
    if (fileInputRef.current !== null) {
      fileInputRef.current.click();
    }
  };
  return (
    <>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={triggerFileInput} style={inputStyles}>
        사진 추가
      </Button>
      <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
      {/* <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button> */}
      <FilePreview>
        {filePreviews.map((fileWithPreview, index) => (
          <PrevWrap key={index} style={{ position: "relative" }}>
            <Image src={fileWithPreview.previewUrl} width={0} height={0} alt={`Preview ${index}`} style={imageStyles} />
          </PrevWrap>
        ))}
      </FilePreview>
    </>
  );
}
