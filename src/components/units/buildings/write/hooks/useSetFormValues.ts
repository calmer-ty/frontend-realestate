import { useEffect } from "react";
import { engToKor } from "@/src/commons/libraries/utils/convertCollection";

import type { IFirestore, IWriteForm } from "@/src/commons/types";
import type { UseFormSetValue } from "react-hook-form";

// 유효한 값인지 체크하는 함수
const isValidValue = (value: any): value is string | number | string[] => {
  return typeof value === "string" || typeof value === "number" || (Array.isArray(value) && value.every((item) => typeof item === "string"));
};

export const useSetFormValues = (docData: IFirestore | undefined, setValue: UseFormSetValue<IWriteForm>): void => {
  useEffect(() => {
    if (docData !== undefined) {
      const excludedKeys = ["_id", "user", "createdAt"];

      Object.entries(docData).forEach(([key, value]) => {
        if (!excludedKeys.includes(key) && isValidValue(value)) {
          setValue(key as keyof IWriteForm, value);
        }
      });
      // type이 있을 경우 한글로 변환하여 설정
      if (typeof docData.type === "string") {
        setValue("type", engToKor(docData.type));
      }
    }
  }, [docData, setValue]);
};
