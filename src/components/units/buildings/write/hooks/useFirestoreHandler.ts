import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import { useAuth } from "@/src/hooks/useAuth";
import { korToEng } from "@/src/commons/libraries/utils/convertCollection";

import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import type { IFirestore, IWriteForm } from "@/src/commons/types";
import type { UseFormGetValues } from "react-hook-form";
import type { Dispatch, SetStateAction } from "react";
import type { AlertColor } from "@mui/material";

interface IUseFirestoreHandlerReturn {
  handleFormSubmit: (data: IWriteForm) => Promise<void>;
  handleFormUpdate: () => Promise<void>;
}
interface IUseFirestoreHandlerParams {
  initialValues: IWriteForm;
  docData: IFirestore | undefined;
  uploadedImageUrls: string[];
  selectedType: string;
  getValues: UseFormGetValues<IWriteForm>;
  uploadImages: () => Promise<string[]>;
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
  setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
  setAlertText: Dispatch<SetStateAction<string>>;
  setRouting: Dispatch<SetStateAction<boolean>>;
}

export const useFirestoreHandler = ({
  initialValues,
  docData,
  uploadedImageUrls,
  selectedType,
  getValues,
  uploadImages,
  setAlertOpen,
  setAlertSeverity,
  setAlertText,
  setRouting,
}: IUseFirestoreHandlerParams): IUseFirestoreHandlerReturn => {
  const { createFirestore, updateFirestore } = useFirestore();
  const { user } = useAuth();

  const handleFormSubmit = async (data: IWriteForm): Promise<void> => {
    try {
      const selectImageUrls = await uploadImages();
      const formData = {
        ...data,
        imageUrls: selectImageUrls,
        user: {
          name: user?.displayName,
          email: user?.email,
          _id: user?.uid,
        },
      };

      await createFirestore(formData, "buildings", selectedType);
      setAlertOpen(true);
      setAlertText("매물 등록이 완료되었습니다.");
      setAlertSeverity("success");

      setRouting(true);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  const handleFormUpdate = async (): Promise<void> => {
    try {
      const currentValues = getValues(); // 현재 폼의 값을 가져옵니다
      const updatedValues: Partial<IWriteForm> = {};

      const selectImageUrls = await uploadImages();
      const currentImageUrls = [...uploadedImageUrls, ...selectImageUrls];

      Object.entries(currentValues).forEach(([key, currentValue]) => {
        const fieldKey = key as keyof IWriteForm;
        const initialValue = initialValues[fieldKey];

        if (fieldKey === "type" && typeof currentValue === "string") {
          currentValue = korToEng(currentValue);
        }

        if (currentValue != null && currentValue !== initialValue && key !== "imageUrls") {
          updatedValues[fieldKey] = currentValue;
        }
        if (JSON.stringify(initialValues.imageUrls) !== JSON.stringify(currentImageUrls)) {
          updatedValues.imageUrls = [...currentImageUrls];
        }
      });

      if (currentImageUrls.length > 5) {
        setAlertOpen(true);
        setAlertText("이미지는 5개까지 업로드가 가능합니다.");
        setAlertSeverity("info");
        return;
      }

      if (Object.keys(updatedValues).length === 0 && JSON.stringify(initialValues.imageUrls) === JSON.stringify(currentImageUrls)) {
        setAlertOpen(true);
        setAlertText("수정된 내역이 없습니다.");
        setAlertSeverity("info");
        return;
      }

      await updateFirestore(updatedValues, "buildings", docData?._id ?? DEFAULT_STRING_VALUE);
      setAlertOpen(true);
      setAlertText("매물 수정이 완료되었습니다.");
      setAlertSeverity("success");

      // 알람 후 페이지 이동
      setRouting(true);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return {
    handleFormSubmit,
    handleFormUpdate,
  };
};
