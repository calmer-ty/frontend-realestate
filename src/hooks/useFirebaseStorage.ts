import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/pages/api/cloudFirestore";
import type { IUseFirebaseStorageProps } from "../types";

export const useFirebaseStorage = (): IUseFirebaseStorageProps => {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file: File | null): Promise<void> => {
    setUploading(true);

    if (file === null) {
      setUploading(false);
      return;
    }

    const storageRef = ref(storage, "uploads/" + file.name);

    try {
      await uploadBytes(storageRef, file);
      alert("File uploaded successfully!");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Upload failed: ", error.message);
      }
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading };
};
