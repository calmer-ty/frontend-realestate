import { useState, useEffect } from "react";
import { useStorage } from "@/src/hooks/firebase/useStorage";

import type { Dispatch, SetStateAction } from "react";
import type { IFirestore } from "@/src/commons/types";

interface IUseImageUploadReturn {
  setSelectedFiles: Dispatch<SetStateAction<File[]>>;
  uploadedImageUrls: string[];
  setUploadedImageUrls: Dispatch<SetStateAction<string[]>>;
  uploadImages: () => Promise<string[]>;
}

export const useImageUpload = (docData: IFirestore | undefined): IUseImageUploadReturn => {
  const { uploadFiles } = useStorage();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (docData?.imageUrls !== undefined) {
      setUploadedImageUrls(docData.imageUrls);
    }
  }, [docData]);

  const uploadImages = async (): Promise<string[]> => {
    return await uploadFiles(selectedFiles);
  };

  return {
    uploadedImageUrls,
    setSelectedFiles,
    setUploadedImageUrls,
    uploadImages,
  };
};
