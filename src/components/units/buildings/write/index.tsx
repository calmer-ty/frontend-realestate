"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import { useStorage } from "@/src/hooks/firebase/useStorage";
import { useAuth } from "@/src/hooks/useAuth";
import { engToKor, korToEng } from "@/src/commons/libraries/utils/convertCollection";
import BuildingInfo from "./buildingInfo";
import DealInfo from "./dealInfo";
import AddInfo from "./addInfo";
import BuildingDesc from "./buildingDesc";
import ImgUpload from "./imgUpload";
import BasicSnackbar from "@/src/components/commons/feedback/snackbar/basic";
import { Alert, Button } from "@mui/material";

import type { IEditFormData } from "./types";
import type { IWriteForm } from "@/src/commons/types";
import * as S from "./styles";

export default function BuildingWrite({ isEdit, docData }: IEditFormData): JSX.Element {
  const router = useRouter();
  const initialValues: IWriteForm = {
    type: docData?.type ?? "",
    address: docData?.address ?? "",
    addressDetail: docData?.addressDetail ?? "",
    area: docData?.area ?? null,
    roomCount: docData?.roomCount ?? null,
    price: docData?.price ?? null,
    manageCost: docData?.manageCost ?? null,
    floor: docData?.floor ?? null,
    bathroomCount: docData?.bathroomCount ?? null,
    elevator: docData?.elevator ?? "없음",
    desc: docData?.desc ?? "",
    imageUrls: docData?.imageUrls ?? [],
  };

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const { uploadFiles } = useStorage();
  const { createFirestore, updateFirestore } = useFirestore();

  const { user } = useAuth();
  const { register, handleSubmit, watch, setValue, getValues, control } = useForm<IWriteForm>({
    defaultValues: initialValues, // 초기값 설정
  });
  const selectedType = korToEng(watch("type")); // 셀렉트 폼에서 가져온 데이터의 타입을 한글로

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"error" | "info" | "success" | "warning">("info");

  // 파이어베이스의 데이터값 불러오는 로직
  useEffect(() => {
    if (docData !== undefined) {
      Object.entries(docData).forEach(([key, value]) => {
        const excludedKeys = ["_id", "user", "createdAt"]; // 제외할 키 추가
        if (!excludedKeys.includes(key) && (typeof value === "string" || typeof value === "number" || (Array.isArray(value) && value.every((item) => typeof item === "string")))) {
          setValue(key as keyof IWriteForm, value);
        }
      });
      if (typeof docData.type === "string") {
        // docData type을 한글로 하여 폼에 뿌림
        setValue("type", engToKor(docData.type));
      }
    }
  }, [docData, setValue]);

  // 이미지 Url uploadedFileUrls 스테이트에 초기화
  useEffect(() => {
    if (docData?.imageUrls !== undefined) {
      setUploadedImageUrls(docData.imageUrls);
    }
  }, [docData]);

  // 등록 버튼 클릭 시 데이터를 Firestore에 추가하는 함수입니다
  const handleFormSubmit = async (data: IWriteForm): Promise<void> => {
    try {
      // 데이터에 파일 다운로드 URL 추가
      const selectImageUrls = await uploadFiles(selectedFiles);
      const formData = {
        ...data,
        imageUrls: selectImageUrls,
        user: {
          name: user?.displayName,
          email: user?.email,
          _id: user?.uid,
        },
      };

      await createFirestore(formData, selectedType);
      setAlertOpen(true);
      setAlertText("매물 등록이 완료되었습니다.");
      setAlertSeverity("success");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  const handleFormUpdate = async (): Promise<void> => {
    try {
      const currentValues = getValues(); // 현재 폼의 값을 가져옵니다
      const updatedValues: Partial<IWriteForm> = {};

      // 이미지 변수
      const selectImageUrls = await uploadFiles(selectedFiles);
      const currentImageUrls = [...uploadedImageUrls, ...selectImageUrls];

      Object.entries(currentValues).forEach(([key, currentValue]) => {
        const fieldKey = key as keyof IWriteForm;
        const initialValue = initialValues[fieldKey];

        // type 키는 초기값을 불러올 시 한글로 변하므로 다시 변환시켜줌
        if (fieldKey === "type" && typeof currentValue === "string") {
          currentValue = korToEng(currentValue);
        }

        // 초기값과 currentValue이 다를 경우 currentValue로 업데이트
        if (currentValue != null && currentValue !== initialValue && key !== "imageUrls") {
          updatedValues[fieldKey] = currentValue;
          console.log("key: ", key);
          console.log("currentValue ===initialValue: ", key, currentValue === initialValue);
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

      await updateFirestore(updatedValues, selectedType, docData?._id ?? "");
      setAlertOpen(true);
      setAlertText("매물 수정이 완료되었습니다.");
      setAlertSeverity("success");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  const alertClose = (): void => {
    setAlertOpen(false);
    router.push("/list");
  };

  return (
    <>
      {/* 폼 */}
      <S.Form onSubmit={handleSubmit(isEdit ? handleFormUpdate : handleFormSubmit)}>
        <BuildingInfo register={register} setValue={setValue} getValues={getValues} control={control} />
        <DealInfo register={register} />
        <AddInfo register={register} control={control} />
        <BuildingDesc register={register} />
        <ImgUpload setSelectedFiles={setSelectedFiles} setUploadedImageUrls={setUploadedImageUrls} imageUrls={docData?.imageUrls} />
        <S.Footer>
          <Button role="submit-button" type="submit" variant="contained">
            {isEdit ? "수정" : "등록"}하기
          </Button>
        </S.Footer>
      </S.Form>

      {/* 알림창 */}
      <BasicSnackbar open={alertOpen} close={alertClose}>
        <Alert onClose={alertClose} severity={alertSeverity}>
          {alertText}
        </Alert>
      </BasicSnackbar>
    </>
  );
}
