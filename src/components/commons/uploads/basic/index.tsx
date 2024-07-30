import { useState } from "react";
import { useFirebaseStorage } from "@/src/hooks/useFirebaseStorage";

import type { ChangeEvent } from "react";

export default function UploadBasic(): JSX.Element {
  const { uploadFile, uploading, error } = useFirebaseStorage();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files !== null) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (): Promise<void> => {
    // 비동기 함수로 선언
    if (file !== null) {
      try {
        await uploadFile(file); // 파일 업로드를 기다림
      } catch (err) {
        console.error("Upload failed:", err); // 오류 처리
      }
    }
  };
  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {error !== "" && <p>Error: {error}</p>}
    </>
  );
}
