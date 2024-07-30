import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/pages/api/cloudFirestore";
import type { IUseFirebaseStorageProps } from "@/src/types";

export const useFirebaseStorage = (): IUseFirebaseStorageProps => {
  const [uploading, setUploading] = useState(false);

  const uploadFiles = async (files: File[]): Promise<void> => {
    setUploading(true);

    const uploadPromises = files.map((file) => {
      const storageRef = ref(storage, "uploads/" + file.name);
      return uploadBytes(storageRef, file);
    });

    try {
      await Promise.all(uploadPromises);
      alert("success upload");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Upload failed: ", error.message);
      }
    } finally {
      setUploading(false);
    }
  };

  return { uploadFiles, uploading };
};
