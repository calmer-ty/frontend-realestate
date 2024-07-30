import Image from "next/image";
import { useRef, useState } from "react";
import { useFirebaseStorage } from "@/src/hooks/useFirebaseStorage";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import type { ChangeEvent } from "react";
import type { IFileWithPreview } from "./types";
import { FilePreview, imageStyles, inputStyles, PrevWrap } from "./styles";

export default function UploadBasic(): JSX.Element {
  const { uploadFiles, uploading } = useFirebaseStorage();
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

      const newFiles = selectedFiles.map((file) => {
        const reader = new FileReader();
        return new Promise<IFileWithPreview>((resolve) => {
          reader.onloadend = () => {
            resolve({
              file,
              previewUrl: reader.result as string,
            });
          };
          reader.readAsDataURL(file);
        });
      });

      // 새로운 파일과 기존 파일을 합쳐서 상태 업데이트
      const fileWithPreviews = await Promise.all(newFiles);
      setFilePreviews((prevFiles) => [...prevFiles, ...fileWithPreviews]);
    }
  };

  // 파일 업로드 핸들러
  const handleUpload = async (): Promise<void> => {
    const filesToUpload = filePreviews.map((fileWithPreview) => fileWithPreview.file);
    try {
      await uploadFiles(filesToUpload);
      console.log("Files uploaded successfully");
    } catch (error) {
      console.error("Upload failed:", error);
    }
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
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
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
